package com.group4.edu.controller;

import com.group4.edu.dto.GraduationThesisDto;
import com.group4.edu.dto.LecturerStudentsDto;
import com.group4.edu.dto.RegisterTimeDto;
import com.group4.edu.dto.SearchObjectDto;
import com.group4.edu.service.GraduationThesisService;
import com.group4.edu.service.RegisterTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
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

    @RequestMapping(value = "/add-outline", method = RequestMethod.POST)
    public ResponseEntity<?> addEmpByExcel(@RequestBody MultipartFile file) throws IOException {
        GraduationThesisDto result = null;
        try {
            result = graduationThesisService.addOutline(file);
            return new ResponseEntity<>(result, result == null?HttpStatus.BAD_REQUEST: HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("error",e.getMessage()), HttpStatus.BAD_REQUEST);
        }
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

    @GetMapping("/getByStudentId/{id}")
    public ResponseEntity<GraduationThesisDto> getByStudentId(@PathVariable("id") Long id){
        GraduationThesisDto result = graduationThesisService.getByStudentId(id);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/getAllBySearch")
    public List<GraduationThesisDto> getAllBySearch(@RequestBody SearchObjectDto dto){
        return graduationThesisService.getGraduationThesis(dto);
    }

    @PostMapping("/setLecturerToStudent")
    public List<GraduationThesisDto> setLecturerToStudent(@RequestBody LecturerStudentsDto dto){
        return graduationThesisService.setLecturerToStudent(dto);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return new ResponseEntity<>(graduationThesisService.delete(id),HttpStatus.OK);
    }

    @PostMapping("/import-mark")
    public List<GraduationThesisDto> importMark(@RequestPart MultipartFile file){
        return graduationThesisService.importMart(file);
    }
    @GetMapping("/export-graduationthesis/{graduationthesisId}")
    public void exportGraduationthesis (@PathVariable("graduationthesisId") Long graduationthesisId, WebRequest request, HttpServletResponse response){
        graduationThesisService.exportGraduationthesis(graduationthesisId, request, response);
    }
}
