package com.group4.edu.controller;

import com.group4.edu.EduConstants;
import com.group4.edu.domain.Account;
import com.group4.edu.domain.Role;
import com.group4.edu.domain.User;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.dto.ResponseToken;
import com.group4.edu.dto.RoleDto;
import com.group4.edu.repositories.AccountRepository;
import com.group4.edu.repositories.RoleRepository;
import com.group4.edu.repositories.UserRepository;
import com.group4.edu.service.AccountService;
import com.group4.edu.service.JwtService;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping
public class LoginController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @RequestMapping(value = "/login-da", method = RequestMethod.POST)
    public ResponseEntity<?> loginDa(HttpServletRequest request, @RequestBody AccountDto accountDto) {
        ResponseToken result = new ResponseToken();
        HttpStatus httpStatus = null;
        try {
            if (accountService.checkLogin(accountDto,EduConstants.Role.ROLESTUDENT_DA.getKey())) {
                String token = jwtService.generateTokenLogin(accountDto.getUsername());
                if (accountService.saveTokenByUsername(token, accountDto.getUsername())) {
                    result.setAccess_Token(token);
                    result.setStatusCode(HttpStatus.OK.toString());
                    httpStatus = HttpStatus.OK;
                }
            } else {
                result.setMessenger("Username hoặc password bị sai, đăng nhập không thành công. ");
                httpStatus = HttpStatus.BAD_REQUEST;
                System.out.println(httpStatus.value());
                result.setStatusCode(String.valueOf(httpStatus.value()));
            }
        } catch (Exception e) {
            System.out.println(httpStatus.value());
            result.setMessenger(e.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
            result.setStatusCode(httpStatus.toString());
        }
        return new ResponseEntity<ResponseToken>(result, httpStatus);
    }

    @RequestMapping(value = "/login-tt", method = RequestMethod.POST)
    public ResponseEntity<?> loginTt(HttpServletRequest request, @RequestBody AccountDto accountDto) {
        ResponseToken result = new ResponseToken();
        HttpStatus httpStatus = null;
        try {
            if (accountService.checkLogin(accountDto,EduConstants.Role.ROLESTUDENT_TT.getKey())) {
                String token = jwtService.generateTokenLogin(accountDto.getUsername());
                if (accountService.saveTokenByUsername(token, accountDto.getUsername())) {
                    result.setAccess_Token(token);
                    result.setStatusCode(HttpStatus.OK.toString());
                    httpStatus = HttpStatus.OK;
                }
            } else {
                result.setMessenger("Username hoặc password bị sai, đăng nhập không thành công. ");
                httpStatus = HttpStatus.BAD_REQUEST;
                result.setStatusCode(httpStatus.toString());
            }
        } catch (Exception e) {
            result.setMessenger(e.getMessage());
            httpStatus = HttpStatus.BAD_REQUEST;
            result.setStatusCode(httpStatus.toString());
        }
        return new ResponseEntity<ResponseToken>(result, httpStatus);
    }
    @GetMapping("/logout")
    public void logout(){
        accountService.logout();
    }

    @Transactional
    @GetMapping("/create-user-admin")
    public ResponseEntity<?> createAccountAdmin() {
        return new ResponseEntity<>("Chức năng đã được rebuild!", HttpStatus.OK);
    }

}
