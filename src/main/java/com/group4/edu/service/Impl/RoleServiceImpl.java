package com.group4.edu.service.Impl;

import com.group4.edu.domain.Role;
import com.group4.edu.dto.RoleDto;
import com.group4.edu.repositories.RoleRepository;
import com.group4.edu.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public RoleDto saveOrUpdate(RoleDto dto,Long id) {
        if(dto != null){
            Role entity = null;
            if(id != null){
                entity = roleRepository.findById(id).orElse(null);
            }
            if(entity == null && dto.getId() != null){
                entity = roleRepository.findById(dto.getId()).orElse(null);
            }
            if(entity != null){
                if(roleRepository.existsByRoleExceptById(dto.getRole(),entity.getId())){
                    return null;
                }
            }
            if(entity == null){
                entity = new Role();
            }
            if(roleRepository.existsByRole(dto.getRole())){
                return null;
            }
            entity.setRole(dto.getRole());
            entity.setDecription(dto.getDecription());
            return new RoleDto(roleRepository.save(entity));
        }
        return null;
    }

    @Override
    public List<RoleDto> getAll() {
        return roleRepository.getAll();
    }

}
