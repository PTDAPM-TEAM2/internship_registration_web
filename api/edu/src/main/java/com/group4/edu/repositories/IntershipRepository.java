package com.group4.edu.repositories;

import com.group4.edu.domain.Internship;
import com.group4.edu.dto.InternshipDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IntershipRepository extends JpaRepository<Internship,Long> {
    @Query("select new com.group4.edu.dto.InternshipDto(e) from Internship  e")
    List<InternshipDto> getAll();
    @Query("select e from Internship  e where e.semester.id =?1 and e.student.id = ?2")
    List<Internship> getBySemesterIdAndStudentId(Long semesterId, Long studentId);

    @Query("select e from Internship  e where e.semester.code =?1 and e.student.id = ?2")
    List<Internship> getBySemesterCodeAndStudentId(String semesterCode, Long studentId);

    @Query("select e from Internship e where e.student.id = ?1")
    List<Internship> getInternshipByStudentId(Long studentId);
}
