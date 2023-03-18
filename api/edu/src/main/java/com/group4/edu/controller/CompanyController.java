package com.group4.edu.controller;

import com.group4.edu.dto.CompanyDto;
import com.group4.edu.service.CompanyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "Công ty")
@RestController
@RequestMapping("/api/company")
public class CompanyController {
    @Autowired
    CompanyService companyService;
    @ApiOperation(value = "Thêm công ty")
    @PostMapping("/save")
    public ResponseEntity<CompanyDto> save(@RequestBody CompanyDto dto){
        CompanyDto result = companyService.saveOrUpdate(dto);
        return ResponseEntity.ok(result);
    }

    @ApiOperation(value = "Lấy danh sách công ty")
    @GetMapping("/getAll")
    public List<CompanyDto> getAll() {
        return companyService.getAll();
    }
}
