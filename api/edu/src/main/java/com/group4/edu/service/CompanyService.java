package com.group4.edu.service;

import com.group4.edu.dto.CompanyDto;

public interface CompanyService {
    CompanyDto saveOrUpdate(CompanyDto dto) throws Exception;
}
