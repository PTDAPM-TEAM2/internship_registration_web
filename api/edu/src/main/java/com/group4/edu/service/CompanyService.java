package com.group4.edu.service;

import com.group4.edu.dto.CompanyDto;

import java.util.List;

public interface CompanyService {
    CompanyDto saveOrUpdate(CompanyDto dto);
    List<CompanyDto> getAll();
}
