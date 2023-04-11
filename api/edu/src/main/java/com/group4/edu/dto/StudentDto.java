package com.group4.edu.dto;

import com.group4.edu.domain.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class StudentDto extends UserDto{
    private String studentCode;
    private GradeDto grade;
    private Integer studentType;
    private GraduationThesisDto graduationThesis;
    private InternshipDto internship;
    private RegisterinternshipDto registerinternship;

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

    public StudentDto(Student entity, GraduationThesis thesis){
        super(entity);
        this.setId(entity.getId());
        this.studentType = entity.getStudentType();
        this.studentCode  = entity.getStudentCode();
        if(entity.getGrade() != null){
            this.grade = new GradeDto(entity.getGrade());
        }
        if(thesis != null){
            this.graduationThesis = new GraduationThesisDto(thesis,true);
        }
    }
    public StudentDto(Student entity, Internship internship){
        super(entity);
        this.setId(entity.getId());
        this.studentType = entity.getStudentType();
        this.studentCode  = entity.getStudentCode();
        if(entity.getGrade() != null){
            this.grade = new GradeDto(entity.getGrade());
        }
        if(internship != null){
            this.internship = new InternshipDto(internship,true);
            this.registerinternship = new RegisterinternshipDto(internship);
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

    public InternshipDto getInternship() {
        return internship;
    }

    public void setInternship(InternshipDto internship) {
        this.internship = internship;
    }

    public RegisterinternshipDto getRegisterinternship() {
        return registerinternship;
    }

    public void setRegisterinternship(RegisterinternshipDto registerinternship) {
        this.registerinternship = registerinternship;
    }
}
