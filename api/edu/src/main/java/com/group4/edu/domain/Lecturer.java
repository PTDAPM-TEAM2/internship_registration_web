package com.group4.edu.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_lecturer")
public class Lecturer extends User{
    @Column(unique = true)
    private String lecturersCode;

    @Column
    private Integer numberOfStudents;

    public String getLecturersCode() {
        return lecturersCode;
    }

    public void setLecturersCode(String lecturersCode) {
        this.lecturersCode = lecturersCode;
    }

    public Integer getNumberOfStudents() {
        return numberOfStudents;
    }

    public void setNumberOfStudents(Integer numberOfStudents) {
        this.numberOfStudents = numberOfStudents;
    }
}
