package com.group4.edu.controller;

import com.group4.edu.domain.Lecturers;
import com.group4.edu.service.LecturersService;
import com.group4.edu.service.StudentService;
import com.group4.edu.service.UserService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private LecturersService lecturersService;

    @Autowired
    private UserService userService;

    @GetMapping("get-current-user")

    public ResponseEntity<?> getCurrentUser(){
        Object result = userService.getCurrentUser();
        return new ResponseEntity<>(result, result == null? HttpStatus.BAD_REQUEST: HttpStatus.OK);
    }


}
