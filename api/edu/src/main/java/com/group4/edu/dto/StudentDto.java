package com.group4.edu.dto;

import com.group4.edu.domain.Grade;
import com.group4.edu.domain.Role;
import com.group4.edu.domain.Student;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class StudentDto extends UserDto{
    private String studentCode;
    private GradeDto grade;
    private Integer studentType;
    private GraduationThesisDto graduationThesis;

    public StudentDto(){}
    public StudentDto(Student entity){
        super(entity);
        this.setId(entity.getId());
        this.studentType = entity.getStudentType();
        this.studentCode  = entity.getStudentCode();
        if(entity.getGrade() != null){
            this.grade = new GradeDto(entity.getGrade());
        }
    }

    public StudentDto(Student entity, boolean nonGetGrade){
        super(entity);
        this.studentCode  = entity.getStudentCode();
        this.studentType = entity.getStudentType();
    }

    public StudentDto(Student entity, Set<Role> roles){
        super(entity,roles);
        this.studentCode  = entity.getStudentCode();
        this.studentType = entity.getStudentType();
        if(entity.getGrade() != null){
            this.grade = new GradeDto(entity.getGrade());
        }
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

    public Integer getStudentType() {
        return studentType;
    }

    public void setStudentType(Integer studentType) {
        this.studentType = studentType;
    }

    public GraduationThesisDto getGraduationThesis() {
        return graduationThesis;
    }

    public void setGraduationThesis(GraduationThesisDto graduationThesis) {
        this.graduationThesis = graduationThesis;
    }
}
