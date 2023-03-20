package com.group4.edu.dto;

import com.group4.edu.domain.Lecturer;
import com.group4.edu.domain.Role;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class LecturerDto extends UserDto {
    private String lecturersCode;
    private Set<RoleDto> roles;

    public LecturerDto(Lecturer entity){
        super(entity);
        super.setId(entity.getId());
        this.lecturersCode  = entity.getLecturersCode();

    }

    public LecturerDto() {
    }

    public LecturerDto(Lecturer entity, Set<Role> roles){
        super(entity,roles);
        this.lecturersCode  = entity.getLecturersCode();
        if(entity.getAccount() != null && entity.getAccount().getRoles() != null){
            this.roles = new HashSet<>();
            for(Role role: entity.getAccount().getRoles()){
                this.roles.add(new RoleDto());
            }
        }
    }

    public String getLecturersCode() {
        return lecturersCode;
    }

    public void setLecturersCode(String lecturersCode) {
        this.lecturersCode = lecturersCode;
    }

    public Set<RoleDto> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleDto> roles) {
        this.roles = roles;
    }
}
