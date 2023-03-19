package com.group4.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group4.edu.dto.GradeDto;
import com.group4.edu.service.GradeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags = "Lớp")
@RestController
@RequestMapping("/api/grade")
public class GradeController {
    @Autowired
    GradeService gradeService;

    @ApiOperation(value = "Lấy danh sách lớp")
    @GetMapping("/getAll")
    public List<GradeDto> getAll() {
        return gradeService.getAll();
    }
}
