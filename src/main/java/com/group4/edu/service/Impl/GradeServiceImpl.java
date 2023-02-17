package com.group4.edu.service.Impl;

import com.group4.edu.EduConstants;
import com.group4.edu.domain.*;
import com.group4.edu.dto.GradeDto;
import com.group4.edu.dto.StudentDto;
import com.group4.edu.repositories.*;
import com.group4.edu.service.AccountService;
import com.group4.edu.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class GradeServiceImpl implements GradeService {
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AccountRoleRepository accountRoleRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepository accountRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Override
    public GradeDto saveOrUpdate(GradeDto gradeDto, Long id) throws Exception {
        if(gradeDto != null){
            if(gradeDto.getName() == null){
                throw new Exception("Ten lop khong duoc de trong");
            }
            Grade entity = null;
            if(id != null){
                entity = gradeRepository.findById(id).orElse(null);
            }
            if(entity == null && gradeDto.getId() != null){
                entity = gradeRepository.findById(gradeDto.getId()).orElse(new Grade());
            }
            if(gradeDto.getName() != null){
                entity.setName(gradeDto.getName());
            }
            if(gradeDto.getStudents() != null && gradeDto.getStudents().size() > 0){
                Set<Student> studentSet = new HashSet<>();
                for(StudentDto stDto: gradeDto.getStudents()){
                    if(stDto.getFullName() == null || stDto.getEmail() == null || stDto.getStudentCode() == null){
                        continue;
                    }
                    Student st = null;
                    Account account = null;
                    boolean isNewAccount = false;
                    if(stDto.getId() != null){
                        st = studentRepository.findById(stDto.getId()).orElse(null);
                    }
                    if(st == null){
                        st = new Student();
                        isNewAccount = true;
                    }
                    st.setGrade(entity);
                    st.setStudentCode(stDto.getStudentCode());
                    st.setEmail(stDto.getEmail());
                    st.setFullName(stDto.getFullName());
                    st.setAddress(stDto.getAddress());
                    st.setDateOfBirth(stDto.getDateOfBirth());
                    st.setGrade(entity);
                    st.setUserType(EduConstants.UserType.STUDENT.getValue());
                    if(isNewAccount){
                        account = new Account();
                        account.setUser(st);
                        account.setPassword(passwordEncoder.encode(stDto.getStudentCode()));
                        account.setUsername(st.getStudentCode());
                        Role role = roleRepository.findByRole(EduConstants.Role.ROLESTUDENT.getValue());
                        if(role == null){
                            role = new Role();
                            role.setRole(EduConstants.Role.ROLESTUDENT.getValue());
                            role = roleRepository.save(role);
                        }
                        Set<AccountRole> accountRoles = new HashSet<>();
                        AccountRole accountRole = new AccountRole();
                        accountRole.setRole(role);
                        accountRole.setAccount(account);
                        accountRoles.add(accountRole);
                        account.setAccountRoleSet(accountRoles);
                    }
                    studentSet.add(st);
                }
                if(entity.getStudents() != null){
                    entity.getStudents().addAll(studentSet);
                }
                else {
                    entity.setStudents(studentSet);
                }
            }
            return new GradeDto(gradeRepository.save(entity));
        }
        return null;
    }

    @Override
    public List<GradeDto> getAll() {
        return gradeRepository.getAll();
    }
}