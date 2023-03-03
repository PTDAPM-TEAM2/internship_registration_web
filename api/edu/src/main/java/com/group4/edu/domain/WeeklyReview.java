package com.group4.edu.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_weekly_review")
public class WeeklyReview extends BaseObject{
    String title;
    String content;
    @ManyToOne
    @JoinColumn(name = "graduationThesis_id")
    GraduationThesis graduationThesis;
}
