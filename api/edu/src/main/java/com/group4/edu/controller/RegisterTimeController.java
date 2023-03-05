package com.group4.edu.controller;

import com.group4.edu.dto.RegisterTimeDto;
import com.group4.edu.service.RegisterTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/registertime")
public class RegisterTimeController {
    @Autowired
    RegisterTimeService registerTimeService;

    //5.51  Use case “Thiết lập thời gian đăng ký” *
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody RegisterTimeDto dto){
        try {
            RegisterTimeDto result = registerTimeService.save(dto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
