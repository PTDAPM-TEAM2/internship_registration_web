package com.group4.edu.service;

import com.group4.edu.dto.CompanyDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CompanyService {
    CompanyDto saveOrUpdate(CompanyDto dto);
    List<CompanyDto> getAll();
    List<CompanyDto> importExcel(MultipartFile file);
}
