package com.group4.edu.service;

import com.group4.edu.dto.LecturerDto;
import com.group4.edu.dto.SearchObjectDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LecturersService {
    LecturerDto saveOrUpdate(LecturerDto dto, Long id) throws Exception;
    List<LecturerDto> getAll();
    List<LecturerDto> getLecturerByFilter(SearchObjectDto dto);
   boolean deleteLt(Long id);
   List<LecturerDto> importExcel(MultipartFile file);
}
