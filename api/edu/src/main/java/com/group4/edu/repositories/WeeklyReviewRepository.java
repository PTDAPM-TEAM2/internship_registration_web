package com.group4.edu.repositories;

import com.group4.edu.domain.WeeklyReview;
import com.group4.edu.dto.WeeklyReviewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeeklyReviewRepository extends JpaRepository<WeeklyReview,Long> {
    @Query("select new com.group4.edu.dto.WeeklyReviewDto(e) from WeeklyReview e" +
            " where e.graduationThesis.id = ?1")
    List<WeeklyReviewDto> getAllByGraduationThesisId(Long graduationThesisId);
}
