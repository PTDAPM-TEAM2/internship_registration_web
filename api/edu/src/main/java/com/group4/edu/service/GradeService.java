package com.group4.edu.service;

import com.group4.edu.dto.GradeDto;

import java.util.List;

public interface GradeService {
    GradeDto saveOrUpdate(GradeDto gradeDto, Long id) throws Exception;
    List<GradeDto> getAll();
}
