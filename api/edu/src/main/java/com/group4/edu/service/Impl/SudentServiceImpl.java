package com.group4.edu.service.Impl;

import com.group4.edu.EduConstants;
import com.group4.edu.domain.*;
import com.group4.edu.dto.StudentDto;
import com.group4.edu.repositories.AccountRepository;
import com.group4.edu.repositories.GradeRepository;
import com.group4.edu.repositories.RoleRepository;
import com.group4.edu.repositories.StudentRepository;
import com.group4.edu.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    @Transactional(rollbackFor = {Exception.class})
    public StudentDto saveOrUpdate(StudentDto studentDto, Long id) throws Exception {
        if(studentDto == null){
            throw new Exception("Thông tin sinh vieen bị trống hoặc lỗi");
        }
        if(studentDto.getStudentCode() == null){
            throw  new Exception("Mã sinh viên bị trống");
        }
        if(studentDto.getFullName() == null){
            throw new Exception("Teen sinh viên bị trống");
        }
        if(studentDto.getEmail() == null){
            throw new Exception("Email sinh viên bị trống");
        }
        if(studentDto.getGrade()== null){
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
            if(studentRepository.existsByStudentCode(studentDto.getStudentCode())){
                throw new Exception("Trùng mã sinh vieen: "+studentDto.getStudentCode());
            }
            entity = new Student();
            isNewAccount = true;
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
        Grade grade = null;
        if(studentDto.getGrade().getId() != null){
            grade = gradeRepository.findById(studentDto.getGrade().getId()).orElse(null);
        }
        if(grade == null && studentDto.getGrade().getName() !=null){
            grade = gradeRepository.findByName(studentDto.getGrade().getName()).orElse(null);
        }
        if(grade == null){
            if(studentDto.getGrade().getName() == null){
                throw new Exception("Không có tên lớp hoặc id của lớp không chính xác");
            }
            grade = new Grade();
            grade.setName(studentDto.getGrade().getName());
            grade = gradeRepository.save(grade);
        }
        entity.setGrade(grade);
        if(isNewAccount){
            account = new Account();
            account.setUsername(studentDto.getStudentCode());
            account.setPassword(passwordEncoder.encode(studentDto.getStudentCode()));
            Role role = roleRepository.findByRole(EduConstants.Role.ROLESTUDENT.getValue());
            if(role == null){
                role = new Role();
                role.setRole(EduConstants.Role.ROLESTUDENT.getValue());
                role = roleRepository.save(role);
            }
            Set<AccountRole> accountRoleSet = new HashSet<>();
            AccountRole accountRole = new AccountRole();
            accountRole.setAccount(account);
            accountRole.setRole(role);
            accountRoleSet.add(accountRole);
            account.setAccountRoleSet(accountRoleSet);
            account = accountRepository.save(account);
            entity.setAccount(account);
        }
        return new StudentDto(studentRepository.save(entity));
    }

    @Override
    public List<StudentDto> getAll() {
        return null;
    }
}
