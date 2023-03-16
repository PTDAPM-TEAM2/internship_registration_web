package com.group4.edu.controller;


import com.group4.edu.dto.WeeklyReviewDto;
import com.group4.edu.service.WeeklyReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weeklyreview")
public class WeeklyReviewController {
    @Autowired
    WeeklyReviewService weeklyReviewService;

    @PostMapping("/save")
    public ResponseEntity<WeeklyReviewDto> save(@RequestBody WeeklyReviewDto dto){
        WeeklyReviewDto result = weeklyReviewService.save(dto);
        return ResponseEntity.ok(result);
    }
    @GetMapping("getAllByGraduationThesisId/{graduationId}")
    public List<WeeklyReviewDto> getAllByGraduationThesisId(@PathVariable("graduationId") Long graduationId){
        return weeklyReviewService.getAllByGraduationThesisId(graduationId);
    }
}
