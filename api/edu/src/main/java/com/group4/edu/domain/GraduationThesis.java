package com.group4.edu.domain;

import com.group4.edu.domain.core.BaseObject;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Table(name = "tbl_graduation_thesis")
public class GraduationThesis extends BaseObject {
    String urlOutline;
    String nameGraduationThesis;
    private Double mark1;
    private Double mark2;
    private Double mark3;
    private Double avgMark;
    Integer status; // 0 đang chờ duyệt, 1 đang làmm, 2 là bị huỷ, 3 hoàn thành
    Integer isAccept; // 0 giáo viên không chấp nhận, 1 đang trong trạng thái chờ, 2 đã dđược chấp
                      // nhận
    @ManyToOne
    @JoinColumn(name = "student_id")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    Student student;

    @ManyToOne
    @JoinColumn(name = "semester_id")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    Semester semester;

    @ManyToOne
    @JoinColumn(name = "lecturer_id")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    Lecturer lecturer;

    Date submitDay; // ngày nộp đồ án

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

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Lecturer getLecturer() {
        return lecturer;
    }

    public void setLecturer(Lecturer lecturer) {
        this.lecturer = lecturer;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public Date getSubmitDay() {
        return submitDay;
    }

    public void setSubmitDay(Date submitDay) {
        this.submitDay = submitDay;
    }
}
