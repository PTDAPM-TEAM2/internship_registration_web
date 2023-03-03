package com.group4.edu.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_ecturers")
public class Lecturer extends User{
    @Column(unique = true)
    private String lecturersCode;

    public String getLecturersCode() {
        return lecturersCode;
    }

    public void setLecturersCode(String lecturersCode) {
        this.lecturersCode = lecturersCode;
    }
}
