package com.group4.edu.dto;

import com.group4.edu.domain.*;

public class InternshipDto extends BaseDto{
    private String internshipPosition;
    private Double mark;
    private String evaluate;
    CompanyDto company;

    StudentDto student;

    SemesterDto semester;

    LecturerDto lecturer;

    public InternshipDto(Internship entity){
        if(entity != null){
            this.setId(entity.getId());
            this.internshipPosition = entity.getInternshipPosition();
            this.mark = entity.getMark();
            this.evaluate = entity.getEvaluate();
            if(entity.getStudent() != null)
                this.student = new StudentDto(entity.getStudent());
            if(entity.getSemester() != null){
                this.semester = new SemesterDto(entity.getSemester());
            }
            if(entity.getLecturer() != null){
                this.lecturer = new LecturerDto(entity.getLecturer());
            }
            if(entity.getCompany() != null){
                this.company = new CompanyDto(entity.getCompany());
            }
        }
    }
    public InternshipDto(Internship entity, boolean notGetStudent){
        if(entity != null){
            this.setId(entity.getId());
            this.internshipPosition = entity.getInternshipPosition();
            this.mark = entity.getMark();
            this.evaluate = entity.getEvaluate();
            if(entity.getSemester() != null){
                this.semester = new SemesterDto(entity.getSemester());
            }
            if(entity.getLecturer() != null){
                this.lecturer = new LecturerDto(entity.getLecturer());
            }
            if(entity.getCompany() != null){
                this.company = new CompanyDto(entity.getCompany());
            }
        }
    }
    public InternshipDto(){}
    public String getInternshipPosition() {
        return internshipPosition;
    }

    public void setInternshipPosition(String internshipPosition) {
        this.internshipPosition = internshipPosition;
    }

    public Double getMark() {
        return mark;
    }

    public void setMark(Double mark) {
        this.mark = mark;
    }

    public String getEvaluate() {
        return evaluate;
    }

    public void setEvaluate(String evaluate) {
        this.evaluate = evaluate;
    }

    public CompanyDto getCompany() {
        return company;
    }

    public void setCompany(CompanyDto company) {
        this.company = company;
    }

    public StudentDto getStudent() {
        return student;
    }

    public void setStudent(StudentDto student) {
        this.student = student;
    }

    public SemesterDto getSemester() {
        return semester;
    }

    public void setSemester(SemesterDto semester) {
        this.semester = semester;
    }

    public LecturerDto getLecturer() {
        return lecturer;
    }

    public void setLecturer(LecturerDto lecturer) {
        this.lecturer = lecturer;
    }
}
