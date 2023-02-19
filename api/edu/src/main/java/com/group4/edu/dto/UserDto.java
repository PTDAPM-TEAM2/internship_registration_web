package com.group4.edu.dto;

import com.group4.edu.domain.Role;
import com.group4.edu.domain.User;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class UserDto extends BaseDto{
    private String fullName;
    private String email;
    private Date dateOfBirth;
    private String address;
    private Integer userType;
    private String firstName;
    private String lastName;
    private String gender;
    private String phoneNumber;
    private String urlImg;

    private Set<RoleDto> roles;

    public UserDto(User entity){
        this.fullName = entity.getFullName();
        this.email = entity.getEmail();
        this.dateOfBirth = entity.getDateOfBirth();
        this.address = entity.getAddress();
        this.userType = entity.getUserType();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
        this.gender = entity.getGender();
        this.phoneNumber = entity.getPhoneNumber();
        this.urlImg = entity.getUrlImg();
    }

    public UserDto(User entity, boolean getAccount){
        this.fullName = entity.getFullName();
        this.email = entity.getEmail();
        this.dateOfBirth = entity.getDateOfBirth();
        this.address = entity.getAddress();
        this.userType = entity.getUserType();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
        this.gender = entity.getGender();
        this.phoneNumber = entity.getPhoneNumber();
        this.urlImg = entity.getUrlImg();
    }

    public UserDto(User entity, Set<Role> roles){
        this.fullName = entity.getFullName();
        this.email = entity.getEmail();
        this.dateOfBirth = entity.getDateOfBirth();
        this.address = entity.getAddress();
        this.userType = entity.getUserType();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
        this.gender = entity.getGender();
        this.phoneNumber = entity.getPhoneNumber();
        this.urlImg = entity.getUrlImg();
        if(roles != null){
            this.roles = new HashSet<>();
            for(Role role: roles){
                this.roles.add(new RoleDto(role));
            }
        }
    }

    public UserDto() {
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

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUrlImg() {
        return urlImg;
    }

    public void setUrlImg(String urlImg) {
        this.urlImg = urlImg;
    }

    public Set<RoleDto> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleDto> roles) {
        this.roles = roles;
    }
}
