package com.group4.edu.controller;

import com.group4.edu.domain.Account;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.dto.ResponseToken;
import com.group4.edu.service.AccountService;
import com.group4.edu.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping
public class LoginController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountService accountService;
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(HttpServletRequest request, @RequestBody AccountDto accountDto) {
        ResponseToken result = new ResponseToken();
        HttpStatus httpStatus = null;
        try {
            if (accountService.checkLogin(accountDto)) {
                result.setAccess_Token(jwtService.generateTokenLogin(accountDto.getUsername()));
                result.setStatusCode(HttpStatus.OK.toString());
                httpStatus = HttpStatus.OK;
            } else {
                result.setMessenger("Wrong userId and password");
                httpStatus = HttpStatus.BAD_REQUEST;
                result.setStatusCode(httpStatus.toString());
            }
        } catch (Exception ex) {
            result.setMessenger("Server Error");
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setStatusCode(httpStatus.toString());
        }
        return new ResponseEntity<ResponseToken>(result, httpStatus);
    }
    @GetMapping ("/crate-user-admin")
    public AccountDto createAccountAdmin(){
        AccountDto accountDto = new AccountDto();
        accountDto.setPassword("admin");
        accountDto.setUsername("admin");
        accountService.saveOrUpdate(accountDto,null,false);
        return accountDto;
    }

}
