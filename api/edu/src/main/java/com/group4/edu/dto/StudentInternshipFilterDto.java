package com.group4.edu.dto;

import java.util.List;

public class StudentInternshipFilterDto {
    List<StudentDto> listSt1;
    List<StudentDto> listSt2;

    public List<StudentDto> getListSt1() {
        return listSt1;
    }

    public void setListSt1(List<StudentDto> listSt1) {
        this.listSt1 = listSt1;
    }

    public List<StudentDto> getListSt2() {
        return listSt2;
    }

    public void setListSt2(List<StudentDto> listSt2) {
        this.listSt2 = listSt2;
    }
}
