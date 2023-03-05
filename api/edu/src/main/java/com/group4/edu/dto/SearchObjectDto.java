package com.group4.edu.dto;

public class SearchObjectDto {
    Integer status; //0 đang chờ duyệt, 1 đang làmm, 2 là bị huỷ, 3 hoàn thành

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
