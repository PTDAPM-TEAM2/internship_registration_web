package com.group4.edu.service.Impl;

import com.group4.edu.EduConstants;
import com.group4.edu.domain.*;
import com.group4.edu.dto.*;
import com.group4.edu.repositories.*;
import com.group4.edu.service.LecturersService;
import com.group4.edu.until.SemesterDateTimeUntil;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class LecturersServiceImpl implements LecturersService {
    @PersistenceContext
    EntityManager manager;
    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private IntershipRepository intershipRepository;

    @Autowired
    private GraduationThesisRepository thesisRepository;

    @Autowired
    private RoleRepository roleRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public LecturerDto saveOrUpdate(LecturerDto dto, Long id) throws Exception {
        if (dto != null) {
            if (dto.getLecturersCode() == null) {
                throw new Exception("Mã giảng viên bị trống");
            }
            if (dto.getFullName() == null) {
                throw new Exception("Tên giảng viên bị trống");
            }
            boolean isNewAccount = false;
            Lecturer entity = null;
            Account account = null;
            if (id != null) {
                entity = lecturerRepository.findById(id).orElse(null);
            }
            if (entity == null && dto.getId() != null) {
                entity = lecturerRepository.findById(dto.getId()).orElse(null);
            }
            if (entity == null) {
                if (lecturerRepository.existsByLecturersCode(dto.getLecturersCode())) {
                    throw new Exception("Ma giang vien da ton tai");
                }
                entity = new Lecturer();
                isNewAccount = true;
            } else {
                if (!dto.getLecturersCode().equals(entity.getLecturersCode()) && lecturerRepository.existsByLecturersCode(dto.getLecturersCode())) {
                    throw new Exception("Ma giảng viên đã tồn tại");
                }
            }
            if ((isNewAccount && lecturerRepository.existsByIdNumber(dto.getIdNumber())) || (!dto.getIdNumber().equals(entity.getIdNumber()) && lecturerRepository.existsByIdNumber(dto.getIdNumber()))) {
                throw new Exception("SCMND hoac SCCCD cua giang vien da ton tai");
            }
            entity.setDateOfBirth(dto.getDateOfBirth());
            entity.setIdNumber(dto.getIdNumber());
            entity.setLecturersCode(dto.getLecturersCode());
            entity.setFullName(dto.getFullName());
            entity.setEmail(dto.getEmail());
            entity.setAddress(dto.getAddress());
            entity.setDateOfBirth(dto.getDateOfBirth());
            entity.setUserType(EduConstants.UserType.LECTURERS.getValue());
            entity.setPhoneNumber(dto.getPhoneNumber());
            if (isNewAccount) {
                account = new Account();
                account.setUsername(dto.getLecturersCode());
                account.setPassword(passwordEncoder.encode(StringUtils.hasText(dto.getPassword())?dto.getPassword():dto.getLecturersCode()));
                account.setUser(entity);
                Role role = roleRepository.findByRole(EduConstants.Role.ROLELECTURERS.getValue());
                if (role == null) {
                    role = new Role();
                    role.setRole(EduConstants.Role.ROLELECTURERS.getValue());
                    role = roleRepository.save(role);
                }
                account.setRoles(new HashSet<>());
                account.getRoles().add(role);
                account = accountRepository.save(account);
            }
            entity.setAccount(account);
            return new LecturerDto(lecturerRepository.save(entity));
        }
        return null;
    }

    @Override
    public List<LecturerDto> getAll() {
        List<LecturerDto> lecturerDtos = lecturerRepository.getAll();
        String semesterCode = SemesterDateTimeUntil.getCodeSemesterDefault();
        for (LecturerDto lecturerDto : lecturerDtos) {
            Integer numGraTh = thesisRepository.countGraduationByLecturerIdandSemesterCode(lecturerDto.getId(), semesterCode);
            if (numGraTh != null) {
                lecturerDto.setNumGrTh(numGraTh);
            }
        }
        return lecturerDtos;
    }

    @Override
    public List<LecturerDto> getLecturerByFilter(SearchObjectDto dto) {
        String semesterCode = SemesterDateTimeUntil.getCodeSemesterDefault();
        if(dto != null && dto.getNumberOfStudentsInLecturer() != null){
            int type = dto.getNumberOfStudentsInLecturer();
            List<Lecturer> lecturers = lecturerRepository.findAll();
            List<LecturerDto>lecturerDtos = new ArrayList<>();
            for(Lecturer lecturer: lecturers){
                Integer x = thesisRepository.countGraduationByLecturerIdandSemesterCode(lecturer.getId(),semesterCode);
                if(x<30 && type==0){
                    lecturerDtos.add(new LecturerDto(lecturer));
                }
                if(x>=30 && type == 1){
                    lecturerDtos.add(new LecturerDto(lecturer));
                }
            }
            return lecturerDtos;
        }
        String whereClause = " where true = true ";
        String sql = "SELECT new com.group4.edu.dto.LecturerDto(tbl_lecturer) FROM Lecturer as tbl_lecturer";


        if (dto != null) {
            if (dto.getFullName() != null && StringUtils.hasText(dto.getFullName())) {
                whereClause += " AND (tbl_lecturer.fullName like :fullName)";
            }

//            if (dto.getNumberOfStudentsInLecturer() != null) {
//                sql += " inner join GraduationThesis entity on entity.lecturer.id = tbl_lecturer.id  ";
//                whereClause += " and (entity.status = 1 or entity.status = 2 and entity.semester.code =:semesterCode)";
//                if (dto.getNumberOfStudentsInLecturer() == 0)
//                    whereClause += " group by tbl_lecturer.id HAVING COUNT(entity.id) < 30";
//                if (dto.getNumberOfStudentsInLecturer() == 1)
//                    whereClause += " group by tbl_lecturer.id HAVING COUNT(entity.id) = 30";
//                if (dto.getNumberOfStudentsInLecturer() == 2)
//                    whereClause += " group by tbl_lecturer.id HAVING COUNT(entity.id) > 30";
//            }
        }
        sql += whereClause;
        Query query = manager.createQuery(sql, LecturerDto.class);
        if(dto != null){
            if (dto.getNumberOfStudentsInLecturer() != null) {
                query.setParameter("semesterCode", semesterCode);
            }

            if (dto.getFullName() != null && StringUtils.hasText(dto.getFullName())) {
                query.setParameter("fullName", '%' + dto.getFullName() + '%');
            }
        }

        List<LecturerDto> entities = query.getResultList();
        return entities;
    }

    @Override
    public boolean deleteLt(Long id) {
        Lecturer lecturer = lecturerRepository.findById(id).orElse(null);
        if (lecturer == null) {
            return false;
        }
        try {
            Account account = accountRepository.getAccountByUserId(lecturer.getId()).orElse(null);
            accountRepository.delete(account);

//            List<Internship> internships = intershipRepository.getInternshipByLecturerId(lecturer.getId());
//            intershipRepository.deleteAll(internships);
//
//            List<GraduationThesis> graduationThesises = thesisRepository.getGraduationThesisByLecturerId(lecturer.getId());
//            thesisRepository.deleteAll(graduationThesises);

            if (lecturerRepository.existsById(lecturer.getId()))
                lecturerRepository.deleteById(lecturer.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<LecturerDto> importExcel(MultipartFile file) {
        XSSFWorkbook workbook = null;
        try {
            workbook = new XSSFWorkbook(file.getInputStream());
        } catch (IOException e) {
            return null;
        }
        List<LecturerDto> lecturerDtos = new ArrayList<>();
        XSSFSheet sheet = workbook.getSheetAt(0);
        int startLine = 0;
        int totalLine = 0;
        int rowIndex = 0;
        SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
        boolean getIndexData = false;
        XSSFRow row = sheet.getRow(0);
        DataFormatter dataFormatter = new DataFormatter();
        if (row != null) {
            if (row.getCell(0) != null && dataFormatter.formatCellValue(row.getCell(0)) != null && row.getCell(1) != null && dataFormatter.formatCellValue(row.getCell(1)) != null) {
                try {
                    startLine = Integer.parseInt(dataFormatter.formatCellValue(row.getCell(0))) - 1;
                    totalLine = Integer.parseInt(dataFormatter.formatCellValue(row.getCell(1)));
                    rowIndex = startLine;
                    getIndexData = true;
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
            }
        }
        if (!getIndexData) {
            rowIndex = 1;
            while (!(sheet.getRow(rowIndex) != null && this.getStringCellValue(sheet.getRow(rowIndex).getCell(0)).equals("STT"))) {
                rowIndex++;
                System.out.println(rowIndex);
                if (rowIndex == 200) {
                    return null;
                }
            }
            startLine = rowIndex++;
        }
        System.out.println(sheet.getRow(rowIndex).getCell(0).getRawValue());
        while ((getIndexData && rowIndex - startLine < totalLine) || (sheet.getRow(rowIndex) != null && !this.getStringCellValue(sheet.getRow(rowIndex).getCell(0)).trim().equals(""))) {
            row = sheet.getRow(rowIndex++);
            LecturerDto lecturerDto = new LecturerDto();
            lecturerDto.setLecturersCode(getStringCellValue(row.getCell(1)));
            lecturerDto.setFullName(row.getCell(2).getStringCellValue());
            lecturerDto.setIdNumber(row.getCell(3).getStringCellValue());
            lecturerDto.setAddress(row.getCell(4).getStringCellValue());
            lecturerDto.setGender(row.getCell(5).getStringCellValue());
            lecturerDto.setDateOfBirth(row.getCell(6).getDateCellValue());
            lecturerDto.setPhoneNumber(this.getStringCellValue(row.getCell(7)));
            lecturerDto.setEmail(row.getCell(8).getStringCellValue());
            try {
                lecturerDto = this.saveOrUpdate(lecturerDto, null);
                lecturerDtos.add(lecturerDto);
            } catch (Exception e) {
            }
        }
        return lecturerDtos;
    }

    private String getStringCellValue(XSSFCell cell) {
        DataFormatter dataFormatter = new DataFormatter();
        return dataFormatter.formatCellValue(cell);
    }
}
