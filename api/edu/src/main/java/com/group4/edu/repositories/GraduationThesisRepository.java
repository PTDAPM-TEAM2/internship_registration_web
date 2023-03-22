package com.group4.edu.repositories;

import com.group4.edu.domain.GraduationThesis;
import com.group4.edu.dto.GraduationThesisDto;
import com.group4.edu.dto.SearchObjectDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface GraduationThesisRepository extends JpaRepository<GraduationThesis,Long> {
    @Query("select new com.group4.edu.dto.GraduationThesisDto(e) from GraduationThesis e" +
            " where e.semester.id = ?2 and e.student.id = ?1 and e.semester.active = true")
    List<GraduationThesisDto> getAllByStIdAndSemesterId(Long IdSv, Long semesterId);

    @Query("select e from GraduationThesis e" +
            " where e.student.id = ?1 and e.semester.active = true")
    List<GraduationThesis> getGraduationThesisByStId(Long stId);

    @Query("select e from GraduationThesis e" +
            " where e.lecturer.id = ?1 and e.semester.active = true")
    List<GraduationThesis> getGraduationThesisByLecturerId(Long ltId);

    @Query("select count(gr.id) from GraduationThesis gr inner join Lecturer le on gr.lecturer.id = le.id " +
            " where (gr.status = 1 or gr.status = 2) and le.id = :lecturerId" +
            " group by le.id")
    Integer getNumberOfStudents (@Param("lecturerId") Long lecturerId);

    @Query("select gr from GraduationThesis gr where gr.student.id = ?1 and (gr.isAccept = 0 or gr.isAccept = 1)")
    GraduationThesis getByStudentId (Long studentId);

    @Query("select new com.group4.edu.dto.GraduationThesisDto(gr) from GraduationThesis gr where gr.student.id = ?1")
    GraduationThesisDto getByStudentIdDto (Long studentId);

    @Query("SELECT COUNT(e) FROM GraduationThesis e WHERE e.lecturer.id=?1 and e.semester.code = ?2")
    Integer countGraduationByLecturerIdandSemesterCode(Long lecturerId, String semesterCOde);
}
