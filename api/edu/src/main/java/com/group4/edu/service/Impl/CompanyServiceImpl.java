package com.group4.edu.service.Impl;

import com.group4.edu.domain.Company;
import com.group4.edu.dto.CompanyDto;
import com.group4.edu.repositories.CompanyRepository;
import com.group4.edu.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    CompanyRepository companyRepository;
    @Override
    public CompanyDto saveOrUpdate(CompanyDto dto)  {
        if(dto == null) return null;

        List<Company> companys = companyRepository.findByTaxCode(dto.getTaxCode());
        if(companys != null && companys.size() > 0){
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
}