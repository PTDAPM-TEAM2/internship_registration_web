package com.group4.edu.service;

import com.group4.edu.dto.RoleDto;

import java.util.List;

public interface RoleService {
    RoleDto saveOrUpdate(RoleDto dto, Long id);

    List<RoleDto> getAll();
}
