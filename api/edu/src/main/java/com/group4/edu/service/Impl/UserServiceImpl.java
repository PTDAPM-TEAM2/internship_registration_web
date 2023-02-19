package com.group4.edu.service.Impl;

import com.group4.edu.EduConstants;
import com.group4.edu.domain.*;
import com.group4.edu.dto.LecturersDto;
import com.group4.edu.dto.StudentDto;
import com.group4.edu.dto.UserDto;
import com.group4.edu.repositories.AccountRepository;
import com.group4.edu.repositories.LecturersRepository;
import com.group4.edu.repositories.StudentRepository;
import com.group4.edu.repositories.UserRepository;
import com.group4.edu.service.JwtService;
import com.group4.edu.service.UserService;
import com.group4.edu.until.RequestUntil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service

public class UserServiceImpl implements UserService {
    private JwtService jwtService = new JwtService();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LecturersRepository lecturersRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AccountRepository accountRepository;
    @Override
    public List<UserDto> getAll() {
        return null;
    }

    @Override
    public Object getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        User user = userRepository.getUserByUsernamefromAccount(username).orElse(null);
        System.out.println(username);
        Set<Role> roles = new HashSet<>();
        Account account = accountRepository.findByUsername(username);
        if(account.getAccountRoleSet() != null){
            for(AccountRole accountRole: account.getAccountRoleSet()){
                roles.add(accountRole.getRole());
            }
        }
        if(user == null || user.getUserType() == null || user.getUserType().equals(EduConstants.UserType.ADMIN.getValue())){
            return new UserDto(user,roles);
        }
        if(user.getUserType().equals(EduConstants.UserType.LECTURERS.getValue())){
            Lecturers lecturers = lecturersRepository.findById(user.getId()).orElse(null);
            return new LecturersDto(lecturers,roles);
        }
        if(user.getUserType().equals(EduConstants.UserType.STUDENT.getValue())){
            Student student = studentRepository.findById(user.getId()).orElse(null);
            return new StudentDto(student, roles);
        }
        return null;
    }
}
