package com.group4.edu.service;

import com.group4.edu.dto.WeeklyReviewDto;

import java.util.List;

public interface WeeklyReviewService {
    WeeklyReviewDto save (WeeklyReviewDto dto);
    List<WeeklyReviewDto> getAllByGraduationThesisId(Long graduationId);
}
