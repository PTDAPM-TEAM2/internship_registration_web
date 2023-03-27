package com.group4.edu.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.group4.edu.EduConstants;
import com.group4.edu.domain.Role;
import com.group4.edu.domain.User;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class UserDto extends BaseDto{
    private String IdNumber;
    private String placeOfBitrh;
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
    private Boolean isAdmin = false;
    private Boolean isLecturer = false;
    private Boolean isStudent = false;

    private Set<RoleDto> roles;
    private String password;

    public UserDto(User entity){
        this.IdNumber = entity.getIdNumber();
        this.fullName = entity.getFullName();
        this.placeOfBitrh = entity.getPlaceOfBirth();
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
        this.placeOfBitrh = entity.getPlaceOfBirth();
        this.IdNumber = entity.getIdNumber();
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
        this.IdNumber = entity.getIdNumber();
        this.setId(entity.getId());
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
        this.placeOfBitrh = entity.getPlaceOfBirth();
        if(entity.getAccount() != null && entity.getAccount().getRoles() != null){
            this.roles = new HashSet<>();
            for(Role role: entity.getAccount().getRoles()){
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

    @JsonIgnore
    public Boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    @JsonIgnore
    public Boolean isLecturer() {
        return isLecturer;
    }

    public void setLecturer(Boolean lecturer) {
        isLecturer = lecturer;
    }

    @JsonIgnore
    public Boolean isStudent() {
        return isStudent;
    }

    public void setStudent(Boolean student) {
        isStudent = student;
    }

    public String getIdNumber() {
        return IdNumber;
    }

    public void setIdNumber(String idNumber) {
        IdNumber = idNumber;
    }

    public String getPlaceOfBitrh() {
        return placeOfBitrh;
    }

    public void setPlaceOfBitrh(String placeOfBitrh) {
        this.placeOfBitrh = placeOfBitrh;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public Boolean getLecturer() {
        return isLecturer;
    }

    public Boolean getStudent() {
        return isStudent;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
