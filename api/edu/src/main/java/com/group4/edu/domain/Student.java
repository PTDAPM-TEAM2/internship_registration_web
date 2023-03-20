package com.group4.edu.domain;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "tbl_student")
public class Student extends User {
    @Column(unique = true)
    private String studentCode;
    @ManyToOne
    @JoinColumn(name = "garde_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Grade grade;

    private Integer studentType; // 1 da, 2tt,3 all

    public String getStudentCode() {
        return studentCode;
    }

    public void setStudentCode(String studentCode) {
        this.studentCode = studentCode;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public Integer getStudentType() {
        return studentType;
    }

    public void setStudentType(Integer studentType) {
        this.studentType = studentType;
    }
}
