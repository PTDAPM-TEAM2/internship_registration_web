package com.group4.edu.service.Impl;

import com.group4.edu.EduConstants;
import com.group4.edu.domain.*;
import com.group4.edu.dto.*;
import com.group4.edu.repositories.*;
import com.group4.edu.service.MailService;
import com.group4.edu.service.StudentService;
import com.group4.edu.service.UserService;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class SudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    @Transactional(rollbackFor = {Exception.class})
    public StudentDto saveOrUpdate(StudentDto studentDto, Long id, int studentType) throws Exception {
        if(studentDto == null){
            throw new Exception("Thông tin sinh viên bị trống hoặc lỗi");
        }
        if(studentDto.getStudentCode() == null || studentDto.getStudentCode().trim().equals("")){
            throw  new Exception("Mã sinh viên bị trống");
        }
        if(studentDto.getFullName() == null || studentDto.getFullName().trim().equals("")){
            throw new Exception("Teen sinh viên bị trống");
        }
        if(studentDto.getEmail() == null || studentDto.getEmail().trim().equals("")){
            throw new Exception("Email sinh viên bị trống");
        }
        if(studentDto.getGrade()== null|| studentDto.getGrade().getName() == null || studentDto.getGrade().getName().trim().equals("")){
            throw new Exception("Lớp sinh viên không đúng");
        }
        Student entity = null;
        Account account = null;
        boolean isNewAccount = false;
        if(id != null){
            entity = studentRepository.findById(id).orElse(null);
        }
        if(entity ==  null && studentDto.getId() != null){
            entity = studentRepository.findById(studentDto.getId()).orElse(null);
        }
        if(entity == null){
            entity = studentRepository.findByStudentCode(studentDto.getStudentCode()).orElse(null);
            if(entity == null){
                entity = new Student();
                isNewAccount = true;
            }
        }
        else {
            if(!studentDto.getStudentCode().equals(entity.getStudentCode()) && studentRepository.existsByStudentCode(studentDto.getStudentCode())){
                throw new Exception("Trùng mã sinh vieen: "+studentDto.getStudentCode());
            }
        }
        entity.setUserType(EduConstants.UserType.STUDENT.getValue());
        entity.setStudentCode(studentDto.getStudentCode());
        entity.setFullName(studentDto.getFullName());
        entity.setAddress(studentDto.getAddress());
        entity.setEmail(studentDto.getEmail());
        entity.setDateOfBirth(studentDto.getDateOfBirth());
        entity.setFirstName(studentDto.getFirstName());
        entity.setLastName(studentDto.getLastName());
        entity.setGender(studentDto.getGender());
        entity.setPhoneNumber(studentDto.getPhoneNumber());
        entity.setUrlImg(studentDto.getUrlImg());
        Grade grade = null;
        if(studentDto.getGrade().getId() != null){
            grade = gradeRepository.findById(studentDto.getGrade().getId()).orElse(null);
        }
        if(grade == null && studentDto.getGrade().getName() !=null){
            grade = gradeRepository.findByName(studentDto.getGrade().getName()).orElse(null);
        }
        if(grade == null){
            grade = new Grade();
            grade.setName(studentDto.getGrade().getName());
            grade = gradeRepository.save(grade);
        }
        entity.setGrade(grade);
        account = entity.getAccount();
        Role roleDa = null;
        Role roleTT = null;
        if(EduConstants.StudentType.STUDENT_DA.getValue().equals(studentType)){
            roleDa = roleRepository.findByRole(EduConstants.Role.ROLESTUDENT_DA.getValue());
        }
        if(EduConstants.StudentType.STUDENT_TT.getValue().equals(studentType)){
            roleTT = roleRepository.findByRole(EduConstants.Role.ROLESTUDENT_TT.getValue());
        }
        if(account == null){
            account = new Account();
            account.setUsername(studentDto.getStudentCode());
            account.setPassword(passwordEncoder.encode(studentDto.getStudentCode()));
            entity.setAccount(account);
            account = accountRepository.save(account);
        }
        if(account.getRoles() == null){
            Set<Role> roleSet = new HashSet<>();
            if(roleDa != null){
                roleSet.add(roleDa);
            }
            if(roleTT != null){
                roleSet.add(roleDa);
            }
            account.setRoles(roleSet);
        }
        else {
            boolean checkRoleDa = false;
            boolean checkRoleTT = false;
            for(Role role: account.getRoles()){
                if(role.getCode().equals(EduConstants.Role.ROLESTUDENT_DA.getKey())){
                    checkRoleDa = true;
                }
                if(role.getCode().equals(EduConstants.Role.ROLESTUDENT_TT.getKey())){
                    checkRoleTT = true;
                }
                if(checkRoleDa && checkRoleTT){
                    break;
                }
            }
            if(!checkRoleDa && roleDa != null){
                account.getRoles().add(roleDa);
            }
            if(!checkRoleTT && roleTT != null){
                account.getRoles().add(roleTT);
            }
        }
        return new StudentDto(studentRepository.save(entity));
    }

    @Override
    public List<StudentDto> getAll() {
        return null;
    }

    @Override
    @Transactional
    public ResponseImportExcelStudentDto importExcel(MultipartFile file) {
        XSSFWorkbook workbook = null;
        try {
            workbook = new XSSFWorkbook(file.getInputStream());
        } catch (IOException e) {
            return null;
        }
        XSSFSheet sheet = workbook.getSheetAt(0);
        System.out.println(sheet.getSheetName());
        int startLine = 0;
        int totalLine = 0;
        int rowIndex = 0;
        SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
        boolean getIndexData = false;
        XSSFRow row = sheet.getRow(0);
        DataFormatter dataFormatter = new DataFormatter();
        if(row != null){
            if(row.getCell(0) != null && dataFormatter.formatCellValue(row.getCell(0)) != null && row.getCell(1) != null && dataFormatter.formatCellValue(row.getCell(1)) != null){
                try {
                    startLine = Integer.parseInt(dataFormatter.formatCellValue(row.getCell(0)) ) -1;
                    totalLine = Integer.parseInt(dataFormatter.formatCellValue(row.getCell(1)) );
                    rowIndex = startLine;
                    getIndexData = true;
                }
                catch (Exception e){
                    System.out.println(e.getMessage());
                }
            }
        }
        if(!getIndexData){
            rowIndex = 1;
            while (!(sheet.getRow(rowIndex) != null &&this.getStringCellValue(sheet.getRow(rowIndex).getCell(0)).equals("STT"))){
                rowIndex++;
                System.out.println(rowIndex);
                if(rowIndex == 200){
                    return null;
                }
            }
            startLine = rowIndex++;
        }
        List<StudentDto> studentDtos = new ArrayList<>();
        List< DataErrorImportExcelDto> dataError = new ArrayList<>();
        System.out.println("rowIndex = "+rowIndex);
        System.out.println("StartIndex = "+startLine);
        System.out.println("TotalLine = "+totalLine);
        System.out.println(sheet.getRow(rowIndex).getCell(0).getRawValue());
        while ((getIndexData && rowIndex - startLine <totalLine) || (sheet.getRow(rowIndex)!= null &&!this.getStringCellValue(sheet.getRow(rowIndex).getCell(0)).trim().equals(""))){
            row = sheet.getRow(rowIndex++);
            System.out.println(rowIndex);
            StudentDto studentDto = new StudentDto();
            studentDto.setStudentCode(getStringCellValue(row.getCell(1)));
            studentDto.setFullName(row.getCell(2).getStringCellValue());
            studentDto.setAddress(row.getCell(3).getStringCellValue());
            studentDto.setGender(row.getCell(4).getStringCellValue());
            studentDto.setDateOfBirth(row.getCell(5).getDateCellValue());
            GradeDto gradeDto = new GradeDto();
            gradeDto.setName(row.getCell(6).getStringCellValue());
            studentDto.setGrade(gradeDto);
            studentDto.setPhoneNumber(this.getStringCellValue(row.getCell(7)));
            studentDto.setEmail(row.getCell(8).getStringCellValue());
            try {
                studentDto = this.saveOrUpdate(studentDto,null,1);
                studentDtos.add(studentDto);
            } catch (Exception e) {
                dataError.add(new DataErrorImportExcelDto(rowIndex, e.getMessage()));
            }
        }
//        Su dung da luong de gui Email;
        int numberOfThread = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThread);
        for(StudentDto studentDto: studentDtos){
            executor.execute(new Runnable() {
                private MailServiceImpl mailService = new MailServiceImpl();
                @Override
                public void run() {
                    String msgBody = "Tên tài khoản và mật khẩu dùng để truy cập vào hệ thống\nTên tài khoản: "+studentDto.getStudentCode()+"\nMật khẩu: "+studentDto.getStudentCode();
                    MailDto mailDto = new MailDto();
                    mailDto.setMsgBody(msgBody);
                    mailDto.setRecipient(studentDto.getEmail());
                    mailDto.setSubject("Tài khoản và mật khẩu dùng đăng nhập vào hệ thống đăng kýd đồ án");
                    mailService.sendSimpleMail(mailDto);
                    System.out.println("Gửi mail đến sv " +studentDto.getStudentCode() +" có địa chỉ mail là "+ studentDto.getEmail()+ " thành công");
                }
            });
        }
        return new ResponseImportExcelStudentDto(studentDtos.size()+dataError.size(),studentDtos.size(),dataError.size(),studentDtos,dataError);
    }
    private String getStringCellValue(XSSFCell cell){
        DataFormatter dataFormatter = new DataFormatter();
        return dataFormatter.formatCellValue(cell);
    }
}
