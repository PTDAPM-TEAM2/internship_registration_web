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

    public StudentDto(){}
    public StudentDto(Student entity){
        super(entity);
        this.setId(entity.getId());
        this.studentCode  = entity.getStudentCode();
        if(entity.getGrade() != null){
            this.grade = new GradeDto(entity.getGrade());
        }
    }

    public StudentDto(Student entity, boolean nonGetGrade){
        super(entity);
        this.studentCode  = entity.getStudentCode();
    }

    public StudentDto(Student entity, Set<Role> roles){
        super(entity,roles);
        this.studentCode  = entity.getStudentCode();
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
}
