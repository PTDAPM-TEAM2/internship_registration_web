package com.group4.edu.dto;

import com.group4.edu.domain.GraduationThesis;


public class GraduationThesisDto extends BaseDto {
    String urlOutline;
    String nameGraduationThesis;
    private Double mark1;
    private Double mark2;
    private Double mark3;
    private Double avgMark;
    Integer status; //0 đang chờ duyệt, 1 đang làmm, 2 là bị huỷ, 3 hoàn thành
    Integer isAccept;
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
        if(entity.getIsAccept() != null)
            this.isAccept = entity.getIsAccept();
        if(entity.getStudent() != null)
            this.student = new StudentDto(entity.getStudent());
        if(entity.getRegisterTime() != null)
            this.registerTime = new RegisterTimeDto(entity.getRegisterTime());
        if(entity.getLecturer() != null){
            this.lecturer = new LecturersDto(entity.getLecturer());
        }
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

    public Integer getIsAccept() {
        return isAccept;
    }

    public void setIsAccept(Integer isAccept) {
        this.isAccept = isAccept;
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
