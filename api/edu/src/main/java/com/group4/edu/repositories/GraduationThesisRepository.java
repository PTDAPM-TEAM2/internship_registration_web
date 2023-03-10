package com.group4.edu.repositories;

import com.group4.edu.domain.GraduationThesis;
import com.group4.edu.dto.GraduationThesisDto;
import com.group4.edu.dto.SearchObjectDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface GraduationThesisRepository extends JpaRepository<GraduationThesis,Long> {
    @Query("select new com.group4.edu.dto.GraduationThesisDto(e) from GraduationThesis e" +
            " where e.registerTime.id = ?2 and e.student.id = ?1")
    List<GraduationThesisDto> getAllBySVAndRegisterTime(Long IdSv, Long registerTimeId);
}
