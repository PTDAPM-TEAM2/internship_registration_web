package com.group4.edu.service.Impl;

import com.group4.edu.domain.Company;
import com.group4.edu.domain.Internship;
import com.group4.edu.dto.CompanyDto;
import com.group4.edu.repositories.CompanyRepository;
import com.group4.edu.repositories.IntershipRepository;
import com.group4.edu.service.CompanyService;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    IntershipRepository intershipRepository;

    @Override
    public CompanyDto saveOrUpdate(CompanyDto dto)  {
        if(dto == null) return null;

       Company company = companyRepository.findByTaxCode(dto.getTaxCode()).orElse(null);
        if(company != null){
            System.out.println("Đã tồn tại công ty này");
            return null;
        }
        Company entity = null;
        if(dto.getId() != null)
            entity = companyRepository.findById(dto.getId()).orElse(null);
        if(entity == null)
            entity = new Company();

        entity.setTaxCode(dto.getTaxCode());
        entity.setNameCompany(dto.getNameCompany());
        entity.setAddress(dto.getAddress());
        entity.setEmail(dto.getEmail());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setCode(dto.getCode());
        entity.setDescription(dto.getDescription());

        entity = companyRepository.save(entity);
        return new CompanyDto(entity);
    }

    @Override
    public List<CompanyDto> getAll (){
        return companyRepository.getAll();
    }

    @Override
    public List<CompanyDto> importExcel(MultipartFile file) {
        XSSFWorkbook workbook = null;
        try {
            workbook = new XSSFWorkbook(file.getInputStream());
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return null;
        }
        XSSFSheet sheet = workbook.getSheetAt(0);
        XSSFCell cellTotalRow = sheet.getRow(1).getCell(6);
        int totalRow = 0;
        try {
            totalRow = (int) cellTotalRow.getNumericCellValue();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
        List<CompanyDto> companyDtos = new ArrayList<>();
        int rowIndex = 1;
        for(int i=1;i<totalRow;i++){
            XSSFRow row = sheet.getRow(rowIndex++);
            CompanyDto companyDto = new CompanyDto();
            companyDto.setNameCompany(row.getCell(0).getStringCellValue());
            companyDto.setTaxCode(row.getCell(1).getStringCellValue());
            companyDto.setEmail(row.getCell(2).getStringCellValue());
            companyDto.setPhoneNumber(row.getCell(3).getStringCellValue());
            companyDto.setAddress(row.getCell(4).getStringCellValue());
            companyDto =  this.saveOrUpdate(companyDto);
            if(companyDto != null){
                companyDtos.add(companyDto);
            }
        }
        return companyDtos;
    }

    @Override
    public boolean delete(Long id) {
        try {
            List<Internship> internships = intershipRepository.getInternshipByCompanyId(id);
            intershipRepository.deleteAll(internships);
            companyRepository.deleteById(id);
            return true;
        } catch (Exception e){
            return false;
        }
    }
}