package com.group4.edu.repositories;

import com.group4.edu.domain.Student;
import com.group4.edu.domain.WeeklyReview;
import com.group4.edu.dto.StudentDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WeeklyReviewRepository extends JpaRepository<WeeklyReview,Long> {
}
