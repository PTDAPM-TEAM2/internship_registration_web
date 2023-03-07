package com.group4.edu.dto;

import com.group4.edu.domain.Lecturer;
import com.group4.edu.domain.Role;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class LecturersDto extends BaseDto {
    private String fullName;
    private String email;
    private Date dateOfBirth;
    private String address;
    private String lecturersCode;
    private Set<RoleDto> roles;

    public LecturersDto(Lecturer entity){
        this.setId(entity.getId());
        this.fullName = entity.getFullName();
        this.email = entity.getEmail();
        this.dateOfBirth = entity.getDateOfBirth();
        this.address = entity.getAddress();
        this.lecturersCode  = entity.getLecturersCode();

    }

    public LecturersDto() {
    }

    public LecturersDto(Lecturer entity, Set<Role> roles){
        this.fullName = entity.getFullName();
        this.email = entity.getEmail();
        this.dateOfBirth = entity.getDateOfBirth();
        this.address = entity.getAddress();
        this.lecturersCode  = entity.getLecturersCode();
        if(entity.getAccount() != null && entity.getAccount().getRoles() != null){
            this.roles = new HashSet<>();
            for(Role role: entity.getAccount().getRoles()){
                this.roles.add(new RoleDto());
            }
        }
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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
