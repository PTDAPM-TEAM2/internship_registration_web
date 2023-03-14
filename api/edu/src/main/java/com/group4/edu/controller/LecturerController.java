package com.group4.edu.controller;

import com.group4.edu.dto.LecturersDto;
import com.group4.edu.dto.SearchObjectDto;
import com.group4.edu.service.LecturersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lecturer")
public class LecturerController {
    @Autowired
    LecturersService lecturersService;

    @PostMapping("/getLecturersBySearch")
    public ResponseEntity<List<LecturersDto>> getGraduationThesis(@RequestBody SearchObjectDto dto){
        List<LecturersDto> re = lecturersService.getGraduationThesis(dto);
        return new ResponseEntity<>(re, HttpStatus.OK);
    }
}
