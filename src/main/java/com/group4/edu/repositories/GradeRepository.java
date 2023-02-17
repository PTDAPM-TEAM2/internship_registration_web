package com.group4.edu.repositories;

import com.group4.edu.domain.Grade;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.dto.GradeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade,Long> {
    @Query("select new com.group4.edu.dto.GradeDto(e) from Grade e")
    List<GradeDto> getAll();
}
