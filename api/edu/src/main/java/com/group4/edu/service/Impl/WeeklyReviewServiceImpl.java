package com.group4.edu.service.Impl;


import com.group4.edu.domain.GraduationThesis;
import com.group4.edu.domain.WeeklyReview;
import com.group4.edu.dto.WeeklyReviewDto;
import com.group4.edu.repositories.GraduationThesisRepository;
import com.group4.edu.repositories.WeeklyReviewRepository;
import com.group4.edu.service.WeeklyReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeeklyReviewServiceImpl implements WeeklyReviewService {
    @Autowired
    WeeklyReviewRepository weeklyReviewRepository;
    @Autowired
    GraduationThesisRepository graduationThesisRepository;
    @Override
    public WeeklyReviewDto save(WeeklyReviewDto dto) {
        if(dto == null) return null;
        WeeklyReview weeklyReview = null;
        if (dto.getId() != null) {
            weeklyReview = weeklyReviewRepository.findById(dto.getId()).orElse(null);
        }
        if(weeklyReview == null)
            weeklyReview = new WeeklyReview();

        weeklyReview.setContent(dto.getContent());
        weeklyReview.setTitle(dto.getTitle());

        if(dto.getGraduationThesis() != null && dto.getGraduationThesis().getId() != null){
            GraduationThesis graduationThesis = graduationThesisRepository.findById(dto.getGraduationThesis().getId()).orElse(null);
            if (graduationThesis != null){
                weeklyReview.setGraduationThesis(graduationThesis);
            }else {
                return null;
            }
        }else {
            return null;
        }
        weeklyReview = weeklyReviewRepository.save(weeklyReview);
        return new WeeklyReviewDto(weeklyReview);
    }

    @Override
    public List<WeeklyReviewDto> getAllByGraduationThesisId(Long graduationId){
        return weeklyReviewRepository.getAllByGraduationThesisId(graduationId);
    }
}
