package com.group4.edu.dto;

import java.util.List;

public class LecturerStudentsDto {
    Long idLecturer;
    List<Long> idStudents;

    public Long getIdLecturer() {
        return idLecturer;
    }

    public void setIdLecturer(Long idLecturer) {
        this.idLecturer = idLecturer;
    }

    public List<Long> getIdStudents() {
        return idStudents;
    }

    public void setIdStudents(List<Long> idStudents) {
        this.idStudents = idStudents;
    }
}
