package com.group4.edu.controller;

import com.group4.edu.dto.GraduationThesisDto;
import com.group4.edu.dto.RegisterTimeDto;
import com.group4.edu.dto.SearchObjectDto;
import com.group4.edu.service.GraduationThesisService;
import com.group4.edu.service.RegisterTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


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

    @RequestMapping(value = "/import-excel-da", method = RequestMethod.POST)
    public ResponseEntity<?> addEmpByExcel(@RequestBody MultipartFile file) throws IOException {
        GraduationThesisDto result = graduationThesisService.addOutline(file);
        return new ResponseEntity<>(result, result == null?HttpStatus.BAD_REQUEST: HttpStatus.OK);
    }

    //5.7 Use case “Xem thông tin đồ án”
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable("id") Long id){
        try {
            GraduationThesisDto result = graduationThesisService.getById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/getAllBySearch")
    public List<GraduationThesisDto> getAllBySearch(@RequestBody SearchObjectDto dto){
        return graduationThesisService.getGraduationThesis(dto);
    }
}
