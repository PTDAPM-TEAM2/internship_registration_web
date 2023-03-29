package com.group4.edu.domain;

import com.group4.edu.domain.core.BaseObject;
import net.bytebuddy.implementation.bind.MethodDelegationBinder;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Table(name = "tbl_register_time")
public class RegisterTime extends BaseObject {
    private Date timeStart;
    private Date timeEnd;
    private Integer type;// 1 là đăng ký đồ án, 2 là đăng ký thực tập

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

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

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }
}
