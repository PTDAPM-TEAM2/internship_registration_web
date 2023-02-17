package com.group4.edu.controller;

import com.group4.edu.dto.RoleDto;
import com.group4.edu.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleController {
    @Autowired
    private RoleService roleService;
    @GetMapping("/getAll")
    public List<RoleDto> getAll(){
        return roleService.getAll();
    }

    @PostMapping("/add")
    public ResponseEntity<?> save(@RequestBody RoleDto roleDto){
        RoleDto result = roleService.saveOrUpdate(roleDto,null);
        return new ResponseEntity<RoleDto>(result, result == null? HttpStatus.BAD_REQUEST: HttpStatus.OK);
    }
}
