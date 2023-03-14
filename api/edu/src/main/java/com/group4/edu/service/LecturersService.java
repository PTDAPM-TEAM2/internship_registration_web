package com.group4.edu.service;

import com.group4.edu.dto.LecturersDto;
import com.group4.edu.dto.SearchObjectDto;

import java.util.List;

public interface LecturersService {
    LecturersDto saveOrUpdate(LecturersDto dto,Long id) throws Exception;
    List<LecturersDto> getAll();
    List<LecturersDto> getGraduationThesis(SearchObjectDto dto);
}
