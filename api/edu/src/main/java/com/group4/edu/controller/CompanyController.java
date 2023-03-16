package com.group4.edu.controller;

import com.group4.edu.dto.CompanyDto;
import com.group4.edu.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {
    @Autowired
    CompanyService companyService;
    @PostMapping("/save")
    public ResponseEntity<CompanyDto> save(@RequestBody CompanyDto dto){
        CompanyDto result = companyService.saveOrUpdate(dto);
        return ResponseEntity.ok(result);
    }
    @GetMapping("/getAll")
    public List<CompanyDto> getAll() {
        return companyService.getAll();
    }
}
