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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(HttpServletRequest request, @RequestBody AccountDto accountDto) {
        ResponseToken result = new ResponseToken();
        HttpStatus httpStatus = null;
        try {
            if (accountService.checkLogin(accountDto)) {
                String token = jwtService.generateTokenLogin(accountDto.getUsername());
                if(accountService.saveTokenByUsername(token,accountDto.getUsername())){
                    result.setAccess_Token(token);
                    result.setStatusCode(HttpStatus.OK.toString());
                    httpStatus = HttpStatus.OK;
                }
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

    @Transactional
    @GetMapping ("/create-user-admin")
    public ResponseEntity<?> createAccountAdmin(){
        Set<Role> roleSet = new HashSet<>();
        Role role1 = new Role();
        Role role2 = new Role();
        Role role3 = new Role();
        role1.setCode(EduConstants.UserType.ADMIN.getValue());
        role1.setRole(EduConstants.Role.ROLEADMIN.getValue());
        role2.setCode(EduConstants.UserType.LECTURERS.getValue());
        role2.setRole(EduConstants.Role.ROLELECTURERS.getValue());
        role3.setCode(EduConstants.UserType.STUDENT.getValue());
        role3.setRole(EduConstants.Role.ROLESTUDENT.getValue());
        roleSet.add(role1);
        roleSet.add(role2);
        roleSet.add(role3);
        List<Role> roleList = roleRepository.saveAll(roleSet);
        AccountDto accountDto = new AccountDto();
        accountDto.setPassword("admin");
        accountDto.setUsername("admin");
        RoleDto roleDto = new RoleDto(roleRepository.findByCode(EduConstants.UserType.ADMIN.getValue()).orElse(null));
        accountDto.setRoles(new HashSet<>());
        accountDto.getRoles().add(roleDto);
        try {
            accountDto = accountService.saveOrUpdate(accountDto,null,false);
        } catch (Exception e) {
            Map<String, String > response = new HashMap<>();
            response.put("code","400");
            response.put("messenger",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        Account account  = accountRepository.findById(accountDto.getId()).orElse(null);
        User user = new User();
        user.setFullName("Admin");
        user.setAccount(account);
        account.setUser(user);
        user.setUserType(EduConstants.UserType.ADMIN.getValue());
        userRepository.save(user);
        Map<String, Object> response = new HashMap<>();
        response.put("role",roleList);
        response.put("AdminAccount",account);
        return new ResponseEntity<>(accountDto,HttpStatus.OK);
    }

}
