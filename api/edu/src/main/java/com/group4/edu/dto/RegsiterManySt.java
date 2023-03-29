package com.group4.edu.dto;

import java.util.ArrayList;
import java.util.List;

public class RegsiterManySt {
    private Long companyId;
    private List<Long> studenId = new ArrayList<>();
    private List<String> studentCodes = new ArrayList<>();

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public List<Long> getStudenId() {
        return studenId;
    }

    public void setStudenId(List<Long> studenId) {
        this.studenId = studenId;
    }

    public List<String> getStudentCodes() {
        return studentCodes;
    }

    public void setStudentCodes(List<String> studentCodes) {
        this.studentCodes = studentCodes;
    }
}
