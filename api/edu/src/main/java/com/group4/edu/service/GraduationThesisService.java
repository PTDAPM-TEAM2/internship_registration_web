package com.group4.edu.service;

import com.group4.edu.dto.GraduationThesisDto;
import com.group4.edu.dto.SearchObjectDto;

import java.util.List;

public interface GraduationThesisService {
    GraduationThesisDto save (GraduationThesisDto dto) throws Exception;
    GraduationThesisDto getById(Long id) throws Exception;
    List<GraduationThesisDto> getGraduationThesis(SearchObjectDto dto);

}
