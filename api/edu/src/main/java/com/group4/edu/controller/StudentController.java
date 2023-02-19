package com.group4.edu.controller;

import com.group4.edu.dto.ResponseImportExcelStudentDto;
import com.group4.edu.dto.StudentDto;
import com.group4.edu.dto.UserDto;
import com.group4.edu.service.StudentService;
import com.group4.edu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private UserService userService;
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody StudentDto dto){
        try {
            StudentDto result = studentService.saveOrUpdate(dto, null);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/import-excel", method = RequestMethod.POST)
    public ResponseEntity<?> addEmpByExcel(@RequestBody MultipartFile file) throws IOException {
        UserDto userInfo = (UserDto) userService.getCurrentUser();
        if(userInfo.getAdmin()){
            ResponseImportExcelStudentDto result = studentService.importExcel(file);
            return new ResponseEntity<>(result, result == null? HttpStatus.BAD_REQUEST:HttpStatus.OK);
        }
        Map<String, String> err = new HashMap<>();
        err.put("statusCoce","403");
        err.put("message","forbidden");
        return new ResponseEntity<>(err,HttpStatus.FORBIDDEN);
    }

}
