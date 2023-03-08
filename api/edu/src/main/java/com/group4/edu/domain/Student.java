package com.group4.edu.domain;

import javax.persistence.*;

@Entity
@Table(name = "tbl_student")
public class Student extends User{
    @Column(unique = true)
    private String studentCode;
    @ManyToOne
    @JoinColumn(name = "garde_id",nullable = false)
    private Grade grade;

     private Integer studentType; // 1 da, 2tt,

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
}
