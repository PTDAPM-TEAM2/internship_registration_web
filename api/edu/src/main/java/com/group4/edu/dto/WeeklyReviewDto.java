package com.group4.edu.dto;

import com.group4.edu.domain.WeeklyReview;

public class WeeklyReviewDto extends BaseDto{
    String title;
    String content;
    GraduationThesisDto graduationThesis;

    public WeeklyReviewDto() {
    }

    public WeeklyReviewDto(WeeklyReview entity) {
        super.setId(entity.getId());
        this.title = entity.getTitle();
        this.content = entity.getContent();

        if(entity.getGraduationThesis() != null)
            this.graduationThesis = new GraduationThesisDto(entity.getGraduationThesis());
    }

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

    public GraduationThesisDto getGraduationThesis() {
        return graduationThesis;
    }

    public void setGraduationThesis(GraduationThesisDto graduationThesis) {
        this.graduationThesis = graduationThesis;
    }
}
