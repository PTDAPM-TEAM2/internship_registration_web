package com.group4.edu.domain;

import com.group4.edu.domain.core.BaseObject;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_intern_ship")
public class Internship extends BaseObject {
    private String internshipPosition;
    private Double mark;
    private String evaluate;

    @ManyToOne
    @JoinColumn (name = "company_id")
    Company company;

    @ManyToOne
    @JoinColumn(name = "student_id")
    Student student;

    @ManyToOne
    @JoinColumn(name = "register_time_id")
    RegisterTime registerTime;

    @ManyToOne
    @JoinColumn(name = "lecturer_id")
    Lecturer lecturer;

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

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public RegisterTime getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(RegisterTime registerTime) {
        this.registerTime = registerTime;
    }

    public Lecturer getLecturer() {
        return lecturer;
    }

    public void setLecturer(Lecturer lecturer) {
        this.lecturer = lecturer;
    }
}
