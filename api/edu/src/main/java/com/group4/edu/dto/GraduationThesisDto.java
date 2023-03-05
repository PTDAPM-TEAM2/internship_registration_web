package com.group4.edu.dto;

import com.group4.edu.domain.BaseObject;
import com.group4.edu.domain.GraduationThesis;


public class GraduationThesisDto extends BaseObject {
    String urlOutline;
    String nameGraduationThesis;
    private Double mark1;
    private Double mark2;
    private Double mark3;
    private Double avgMark;
    Integer status; //0 đang chờ duyệt, 1 đang làmm, 2 là bị huỷ, 3 hoàn thành
    Boolean isAccept; //0 giáo viên chưa tiếp nhận, 1 giáo viên đã tiếp nhận
    StudentDto student;
    RegisterTimeDto registerTime;
    LecturersDto lecturer;

    public GraduationThesisDto() {
    }

    public GraduationThesisDto(GraduationThesis entity) {
        this.urlOutline = entity.getUrlOutline();
        this.nameGraduationThesis = entity.getNameGraduationThesis();
        this.mark1 = entity.getMark1();
        this.mark2 = entity.getMark2();
        this.mark3 = entity.getMark3();
        this.avgMark = entity.getAvgMark();
        this.status = entity.getStatus();
        this.isAccept = entity.getAccept();
        this.student = new StudentDto(entity.getStudent());
        this.registerTime = new RegisterTimeDto(entity.getRegisterTime());
        this.lecturer = new LecturersDto(entity.getLecturer());
    }

    public String getUrlOutline() {
        return urlOutline;
    }

    public void setUrlOutline(String urlOutline) {
        this.urlOutline = urlOutline;
    }

    public String getNameGraduationThesis() {
        return nameGraduationThesis;
    }

    public void setNameGraduationThesis(String nameGraduationThesis) {
        this.nameGraduationThesis = nameGraduationThesis;
    }

    public Double getMark1() {
        return mark1;
    }

    public void setMark1(Double mark1) {
        this.mark1 = mark1;
    }

    public Double getMark2() {
        return mark2;
    }

    public void setMark2(Double mark2) {
        this.mark2 = mark2;
    }

    public Double getMark3() {
        return mark3;
    }

    public void setMark3(Double mark3) {
        this.mark3 = mark3;
    }

    public Double getAvgMark() {
        return avgMark;
    }

    public void setAvgMark(Double avgMark) {
        this.avgMark = avgMark;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Boolean getAccept() {
        return isAccept;
    }

    public void setAccept(Boolean accept) {
        isAccept = accept;
    }

    public StudentDto getStudent() {
        return student;
    }

    public void setStudent(StudentDto student) {
        this.student = student;
    }

    public RegisterTimeDto getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(RegisterTimeDto registerTime) {
        this.registerTime = registerTime;
    }

    public LecturersDto getLecturer() {
        return lecturer;
    }

    public void setLecturer(LecturersDto lecturer) {
        this.lecturer = lecturer;
    }
}
