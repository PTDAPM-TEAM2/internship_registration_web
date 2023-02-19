package com.group4.edu.dto;

import com.group4.edu.domain.Role;

public class RoleDto extends BaseDto{
    String role;
    Integer code;
    String decription;

    public RoleDto(Role entity){
        if(entity != null){
            this.setId(entity.getId());
            this.setRole(entity.getRole());
            this.setDecription(entity.getDecription());
            this.code = entity.getCode();
        }
    }

    public RoleDto() {
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDecription() {
        return decription;
    }

    public void setDecription(String decription) {
        this.decription = decription;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
