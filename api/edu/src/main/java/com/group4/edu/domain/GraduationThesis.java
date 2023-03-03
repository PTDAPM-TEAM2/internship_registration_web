package com.group4.edu.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_graduation_thesis")
public class GraduationThesis extends BaseObject{
    String urlOutline;
    String nameGraduationThesis;
    private Double mark1;
    private Double mark2;
    private Double mark3;
    private Double avgMark;
    Integer status; //0 đang chờ duyệt, 1 đang làmm, 2 là bị huỷ, 3 hoàn thành
    Boolean isAccept; //0 giáo viên chưa tiếp nhận, 1 giáo viên đã tiếp nhận
    @ManyToOne
    @JoinColumn(name = "student_id")
    Student student;

    @ManyToOne
    @JoinColumn(name = "register_time_id")
    RegisterTime registerTime;

    @ManyToOne
    @JoinColumn(name = "lecturer_id")
    Lecturer lecturer;
}
