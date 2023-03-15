package com.group4.edu.service;

import com.group4.edu.dto.LecturerDto;
import com.group4.edu.dto.SearchObjectDto;

import java.util.List;

public interface LecturersService {
    LecturerDto saveOrUpdate(LecturerDto dto, Long id) throws Exception;
    List<LecturerDto> getAll();
    List<LecturerDto> getGraduationThesis(SearchObjectDto dto);
}
