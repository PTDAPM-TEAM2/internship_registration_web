package com.group4.edu.service.Impl;

import com.group4.edu.EduConstants;
import com.group4.edu.domain.*;
import com.group4.edu.dto.*;
import com.group4.edu.repositories.*;
import com.group4.edu.service.JwtService;
import com.group4.edu.service.UserService;
import com.group4.edu.until.SemesterDateTimeUntil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    private JwtService jwtService = new JwtService();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private GraduationThesisRepository thesisRepository;
    @Autowired
    private IntershipRepository intershipRepository;
    @Override
    public List<UserDto> getAll() {
        return null;
    }

    @Override
    public Object getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        User user = userRepository.getUserByUsernamefromAccount(username).orElse(null);
        Set<Role> roles = new HashSet<>();
        Account account = accountRepository.findByUsername(username);
//        if(account.getAccountRoleSet() != null){
//            for(AccountRole accountRole: account.getAccountRoleSet()){
//                roles.add(accountRole.getRole());
//            }
//        }
        if(user != null && user.getUserType() != null && user.getUserType().equals(EduConstants.UserType.ADMIN.getValue())){
            UserDto userDto = new UserDto(user,roles);
            userDto.setAdmin(true);
            return userDto;
        }
        if(user.getUserType().equals(EduConstants.UserType.LECTURERS.getValue())){
            Lecturer lecturer = lecturerRepository.findById(user.getId()).orElse(null);
            LecturerDto lecturerDto = new  LecturerDto(lecturer,roles);
            lecturerDto.setLecturer(true);
            return lecturerDto;
        }
        if(user.getUserType().equals(EduConstants.UserType.STUDENT.getValue())){
            Student student = studentRepository.findById(user.getId()).orElse(null);
            StudentDto studentDto = new StudentDto(student, roles);
            studentDto.setStudent(true);
            List<GraduationThesis> graduationThesiss = thesisRepository.getGraduationThesisByStId(student.getId());
            studentDto.setGraduationThesis(graduationThesiss.size()>0?new GraduationThesisDto(graduationThesiss.get(0),true):null);
            List<Internship> internships = intershipRepository.getBySemesterCodeAndStudentId(SemesterDateTimeUntil.getCurrentSemesterCode(),student.getId());
            studentDto.setInternship(internships.size()>0?new InternshipDto(internships.get(0), true):null);
            return studentDto;
        }
        return null;
    }
}
