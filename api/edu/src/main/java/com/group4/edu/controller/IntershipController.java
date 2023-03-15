package com.group4.edu.controller;

import com.group4.edu.dto.InternshipDto;
import com.group4.edu.dto.RegisterinternshipDto;
import com.group4.edu.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/internship")
public class IntershipController {
    @Autowired
    private InternshipService internshipService;
    @PostMapping("/register-internship")
    public ResponseEntity<?> registerInternship(@RequestBody RegisterinternshipDto dto){
        try {
            InternshipDto result = internshipService.registerOrUpdateIntership(dto, null);
            return new ResponseEntity<>(result, result==null? HttpStatus.BAD_REQUEST: HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(Collections.singletonMap("error",e.getMessage()),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-by-student-login")
    public ResponseEntity<?> getInternshipByCurrentUser(){
        InternshipDto result = internshipService.getIntershipByCurrentUser();
        return new ResponseEntity<>(result,result==null?HttpStatus.BAD_REQUEST:HttpStatus.OK);
    }
}
