package com.group4.edu.dto;

import com.group4.edu.domain.BaseObject;
import com.group4.edu.domain.RegisterTime;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

public class RegisterTimeDto extends BaseDto {
    private Date timeStart;
    private Date timeEnd;
    private Integer type;// 1 là đăng ký đồ án, 2 là đăng ký thực tập
    private String semester;

    public RegisterTimeDto() {
    }

    public RegisterTimeDto(RegisterTime entity) {
        super.setId(entity.getId());
        this.timeStart = entity.getTimeStart();
        this.timeEnd = entity.getTimeEnd();
        this.type = entity.getType();
        this.semester = entity.getSemester();
    }

    public Date getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(Date timeStart) {
        this.timeStart = timeStart;
    }

    public Date getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(Date timeEnd) {
        this.timeEnd = timeEnd;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }
}
