package com.group4.edu.controller;

import com.group4.edu.dto.InternshipDto;
import com.group4.edu.dto.RegisterinternshipDto;
import com.group4.edu.dto.RegsiterManySt;
import com.group4.edu.dto.Search.StudentSearchDto;
import com.group4.edu.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.List;

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
    @PostMapping("/get-st-by-filter")
    public ResponseEntity<?> getStudentByFilter(@RequestBody(required = false) StudentSearchDto dto){
        return new ResponseEntity<>(internshipService.getStudentByfilter(dto),HttpStatus.OK);
    }
    @PostMapping("/find-st")
    public ResponseEntity<?> findStudent(@RequestBody StudentSearchDto dto){
        return new ResponseEntity<>(internshipService.findStudentByDto(dto),HttpStatus.OK);
    }
    @PostMapping("register-many-st")
    public List<InternshipDto> internshipDtos(@RequestBody RegsiterManySt dto){
        return internshipService.regsiterMany(dto);
    }

    @GetMapping("/export-internship/{internshipId}")
    public void exportInternship (@PathVariable("internshipId") Long internshipId,WebRequest request, HttpServletResponse response){
        internshipService.exportInternship(internshipId, request, response);
    }

    @PostMapping("/import-mark")
    public List<InternshipDto> importMark(@RequestPart MultipartFile file){
        return internshipService.importMark(file);
    }
}
