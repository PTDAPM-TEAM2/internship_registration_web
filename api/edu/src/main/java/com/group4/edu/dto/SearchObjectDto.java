package com.group4.edu.dto;

public class SearchObjectDto {
    Integer status; //0 đang chờ duyệt, 1 đang làmm, 2 là bị huỷ, 3 hoàn thành

    String fullName;
    Long lecturerId;
    Integer isAccept; //0 giáo viên không chấp nhận, 1 đang trong trạng thái chờ, 2 đã dđược chấp nhận // 3 là cả 0 và 1

    Integer numberOfStudentsInLecturer; // 0 là dưới 30, 1 là bằng 30, 2 là trên 30

    public Integer getStatus() {
        return status;
    }
    public void setStatus(Integer status) {
        this.status = status;
    }
    public Long getLecturerId() {
        return lecturerId;
    }
    public void setLecturerId(Long lecturerId) {
        this.lecturerId = lecturerId;
    }

    public Integer getIsAccept() {
        return isAccept;
    }

    public void setIsAccept(Integer isAccept) {
        this.isAccept = isAccept;
    }

    public Integer getNumberOfStudentsInLecturer() {
        return numberOfStudentsInLecturer;
    }

    public void setNumberOfStudentsInLecturer(Integer numberOfStudentsInLecturer) {
        this.numberOfStudentsInLecturer = numberOfStudentsInLecturer;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}
