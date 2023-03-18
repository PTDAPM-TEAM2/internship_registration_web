package com.group4.edu.dto;

import com.group4.edu.domain.RegisterTime;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

public class RegisterTimeDto extends BaseDto {
    private Date timeStart;
    private Date timeEnd;
    private Integer type;// 1 là đăng ký đồ án, 2 là đăng ký thực tập
    private SemesterDto semester;
    private Integer index;
    private Boolean active;

    public RegisterTimeDto() {
    }

    public RegisterTimeDto(RegisterTime entity) {
        super.setId(entity.getId());
        this.timeStart = entity.getTimeStart();
        this.timeEnd = entity.getTimeEnd();
        this.type = entity.getType();
        this.semester = new SemesterDto(entity.getSemester());
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

    public SemesterDto getSemester() {
        return semester;
    }

    public void setSemester(SemesterDto semester) {
        this.semester = semester;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
