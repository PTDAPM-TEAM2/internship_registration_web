package com.group4.edu.controller;

import com.group4.edu.dto.ResponseToken;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.service.JwtService;
import com.group4.edu.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("api/account")
public class AccountController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountService accountService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<?> save(@RequestBody AccountDto accountDto){
        try {
            return new ResponseEntity<>(accountService.saveOrUpdate(accountDto,null,true),HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String > response = new HashMap<>();
            response.put("code","400");
            response.put("messenger",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(accountService.getAll(), HttpStatus.OK);
    }
}
