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
            return new GradeDto(gradeRepository.save(entity));
        }
        return null;
    }

    @Override
    public List<GradeDto> getAll() {
        return gradeRepository.getAll();
    }
}