package com.group4.edu.domain;

import com.group4.edu.domain.core.BaseObject;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Table(name = "tbl_intern_ship")
public class Internship extends BaseObject {
    private String internshipPosition;
    private Double mark;
    private String evaluate;
    private Date start;
    private Date end;

    @ManyToOne
    @JoinColumn(name = "company_id")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    Company company;

    @ManyToOne
    @JoinColumn(name = "student_id")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    Student student;

    @ManyToOne
    @JoinColumn(name = "semester_id")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    Semester semester;

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

    public Lecturer getLecturer() {
        return lecturer;
    }

    public void setLecturer(Lecturer lecturer) {
        this.lecturer = lecturer;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }
}
