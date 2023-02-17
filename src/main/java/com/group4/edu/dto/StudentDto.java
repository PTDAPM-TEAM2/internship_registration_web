package com.group4.edu.dto;

import com.group4.edu.domain.Grade;
import com.group4.edu.domain.Student;

import java.util.Date;

public class StudentDto extends  BaseDto{
    private String fullName;
    private String email;
    private Date dateOfBirth;
    private String address;
    private String studentCode;

    private GradeDto grade;

    public StudentDto(){}
    public StudentDto(Student entity){
        this.fullName = entity.getFullName();
        this.email = entity.getEmail();
        this.dateOfBirth = entity.getDateOfBirth();
        this.address = entity.getAddress();
        this.studentCode  = entity.getStudentCode();
        if(entity.getGrade() != null){
            this.grade = new GradeDto(entity.getGrade());
        }
    }

    public StudentDto(Student entity, boolean nonGetGrade){
        this.fullName = entity.getFullName();
        this.email = entity.getEmail();
        this.dateOfBirth = entity.getDateOfBirth();
        this.address = entity.getAddress();
        this.studentCode  = entity.getStudentCode();
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

    public String getStudentCode() {
        return studentCode;
    }

    public void setStudentCode(String studentCode) {
        this.studentCode = studentCode;
    }

    public GradeDto getGrade() {
        return grade;
    }

    public void setGrade(GradeDto grade) {
        this.grade = grade;
    }
}
