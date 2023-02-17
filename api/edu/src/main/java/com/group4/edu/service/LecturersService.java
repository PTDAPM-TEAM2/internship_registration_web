package com.group4.edu.service;

import com.group4.edu.dto.LecturersDto;

import java.util.List;

public interface LecturersService {
    LecturersDto saveOrUpdate(LecturersDto dto,Long id) throws Exception;
    List<LecturersDto> getAll();
}
