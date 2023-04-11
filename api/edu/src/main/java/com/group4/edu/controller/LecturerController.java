package com.group4.edu.controller;

import com.group4.edu.dto.LecturerDto;
import com.group4.edu.dto.SearchObjectDto;
import com.group4.edu.service.LecturersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/lecturer")
public class LecturerController {
    @Autowired
    LecturersService lecturersService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        LecturerDto lecturerDto = lecturersService.getById(id);
        return new ResponseEntity<>(lecturerDto==null?Collections.singletonMap("error","Không tìm thấy giảng viên"):lecturerDto,lecturerDto==null?HttpStatus.BAD_REQUEST:HttpStatus.OK);
    }
    @PostMapping("/getLecturersBySearch")
    public ResponseEntity<List<LecturerDto>> getLecturerBySearch(@RequestBody(required = false) SearchObjectDto dto){
        List<LecturerDto> re = lecturersService.getLecturerByFilter(dto);
        return new ResponseEntity<>(re, HttpStatus.OK);
    }
    @PostMapping("/getLecturersByFilter")
    public ResponseEntity<List<LecturerDto>> getGraduationThesis(@RequestBody SearchObjectDto dto){
        List<LecturerDto> re = lecturersService.getLecturerByFilter(dto);
        return new ResponseEntity<>(re, HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody LecturerDto dto){
        try {
            LecturerDto result = lecturersService.saveOrUpdate(dto,null);
            return new ResponseEntity<>(result, result== null? HttpStatus.BAD_REQUEST: HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("error",e.getMessage()),HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody LecturerDto dto){
        try {
            LecturerDto result = lecturersService.saveOrUpdate(dto,id);
            return new ResponseEntity<>(result, result== null? HttpStatus.BAD_REQUEST: HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("error",e.getMessage()),HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/get-all")
    public ResponseEntity<List<LecturerDto>> getAll(){
        return new ResponseEntity<>(lecturersService.getAll(),HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStTT(@PathVariable Long id){
        return new ResponseEntity<>(lecturersService.deleteLt(id),HttpStatus.OK);
    }
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("/import-excel")
    public List<LecturerDto> importExcel(@RequestPart MultipartFile file){
        return lecturersService.importExcel(file);
    }
}
