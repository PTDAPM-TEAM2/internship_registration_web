package com.group4.edu.controller;

import com.group4.edu.domain.Student;
import com.group4.edu.dto.ResponseImportExcelStudentDto;
import com.group4.edu.dto.Search.StudentSearchDto;
import com.group4.edu.dto.StudentDto;
import com.group4.edu.dto.UserDto;
import com.group4.edu.service.StudentService;
import com.group4.edu.service.UserService;
import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private UserService userService;
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("/save/da")
    public ResponseEntity<?> save(@RequestBody StudentDto dto) throws Exception {
        try {
            StudentDto result = studentService.saveOrUpdate(dto, null,1);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(new HashMap<>(Collections.singletonMap("messgae",ex.getMessage())), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("/save/tt")
    public ResponseEntity<?> saveTT(@RequestBody StudentDto dto){
        try {
            StudentDto result = studentService.saveOrUpdate(dto, null,2);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(new HashMap<>(Collections.singletonMap("messgae",ex.getMessage())), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("/update/da/{id}")
    public ResponseEntity<?> updateDa(@PathVariable Long id,@RequestBody StudentDto dto){
        try {
            StudentDto result = studentService.saveOrUpdate(dto, id,1);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(new HashMap<>(Collections.singletonMap("messgae",ex.getMessage())), HttpStatus.BAD_REQUEST);
        }
    }
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("/update/tt/{id}")
    public ResponseEntity<?> updateTT(@PathVariable Long id,@RequestBody StudentDto dto){
        try {
            StudentDto result = studentService.saveOrUpdate(dto, id,2);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(new HashMap<>(Collections.singletonMap("messgae",ex.getMessage())), HttpStatus.BAD_REQUEST);
        }
    }


    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping(value = "/import-excel-da")
    public ResponseEntity<?> addEmpByExcel(@RequestPart MultipartFile file) throws IOException {
        ResponseImportExcelStudentDto result = studentService.importExcel(file);
        return new ResponseEntity<>(result, result == null? HttpStatus.BAD_REQUEST:HttpStatus.OK);
    }

    @PostMapping(value = "/get-st-da-by-search")
    public List<StudentDto> GetStDa(@RequestBody(required = false) StudentSearchDto studentSearchDto){
        return studentService.getStDaBySearch(studentSearchDto,1);
    }

    @PostMapping(value = "/get-st-tt-by-search")
    public List<StudentDto> GetStTT(@RequestBody(required = false) StudentSearchDto studentSearchDto){
        return studentService.getStDaBySearch(studentSearchDto,2);
    }

    @DeleteMapping("/delete/tt/{id}")
    public ResponseEntity<?> deleteStTT(@PathVariable Long id){
        return new ResponseEntity<>(studentService.deleteStTT(id),HttpStatus.OK);
    }
}
