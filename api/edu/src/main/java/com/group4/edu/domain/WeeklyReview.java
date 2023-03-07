package com.group4.edu.domain;

import com.group4.edu.domain.core.BaseObject;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_weekly_review")
public class WeeklyReview extends BaseObject {
    String title;
    String content;
    @ManyToOne
    @JoinColumn(name = "graduationThesis_id")
    GraduationThesis graduationThesis;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public GraduationThesis getGraduationThesis() {
        return graduationThesis;
    }

    public void setGraduationThesis(GraduationThesis graduationThesis) {
        this.graduationThesis = graduationThesis;
    }
}
