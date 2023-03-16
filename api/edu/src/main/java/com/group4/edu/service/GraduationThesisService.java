package com.group4.edu.service;

import com.group4.edu.dto.GraduationThesisDto;
import com.group4.edu.dto.LecturerStudentsDto;
import com.group4.edu.dto.SearchObjectDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GraduationThesisService {
    GraduationThesisDto save (GraduationThesisDto dto) throws Exception;
    GraduationThesisDto getById(Long id) throws Exception;
    List<GraduationThesisDto> getGraduationThesis(SearchObjectDto dto);
    GraduationThesisDto addOutline(MultipartFile file) throws Exception;

    List<GraduationThesisDto> setLecturerToStudent (LecturerStudentsDto lecturerStudentsDto);

    GraduationThesisDto getByStudentId(Long id);

}
