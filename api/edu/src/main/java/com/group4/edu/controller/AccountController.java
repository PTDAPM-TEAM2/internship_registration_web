package com.group4.edu.controller;

import com.group4.edu.domain.User;
import com.group4.edu.dto.ChangePasswordDto;
import com.group4.edu.dto.ResponseToken;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.service.JwtService;
import com.group4.edu.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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

//    @RequestMapping(value = "/save", method = RequestMethod.POST)
//    public ResponseEntity<?> save(@RequestBody AccountDto accountDto){
//        try {
//            return new ResponseEntity<>(accountService.saveOrUpdate(accountDto,null,true),HttpStatus.OK);
//        } catch (Exception e) {
//            Map<String, String > response = new HashMap<>();
//            response.put("code","400");
//            response.put("messenger",e.getMessage());
//            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
//        }
//    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(accountService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePass(@RequestBody ChangePasswordDto passwordDto){
        try {
            return new ResponseEntity<>(accountService.changePassword(passwordDto),HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

//    @PersistenceContext
//    EntityManager manager;
//    @GetMapping("/test/{id}")
//    public User customFindMethod( @PathVariable Long id) {
//        return (User) manager.createQuery("select u FROM User u WHERE u.id = :id")
//                .setParameter("id", id)
//                .getSingleResult();
//
//    }


}
