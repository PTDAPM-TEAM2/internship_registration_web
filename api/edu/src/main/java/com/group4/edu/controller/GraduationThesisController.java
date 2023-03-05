package com.group4.edu.controller;

import com.group4.edu.dto.GraduationThesisDto;
import com.group4.edu.dto.RegisterTimeDto;
import com.group4.edu.service.GraduationThesisService;
import com.group4.edu.service.RegisterTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/graduationthesis")
public class GraduationThesisController {
    @Autowired
    GraduationThesisService graduationThesisService;

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody GraduationThesisDto dto){
        try {
            GraduationThesisDto result = graduationThesisService.save(dto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
