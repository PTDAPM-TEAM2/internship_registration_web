package com.group4.edu.repositories;

import com.group4.edu.domain.GraduationThesis;
import com.group4.edu.domain.Student;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.dto.StudentDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    @Query("select new com.group4.edu.dto.StudentDto(e) from Student e")
    List<StudentDto> getAll();

    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Student e where e.studentCode =?1")
    Boolean existsByStudentCode(String code);

    @Query(value = "SELECT e FROM Student e where e.studentCode =?1")
    Optional<Student> findByStudentCode(String studentCode);

    @Query("SELECT new com.group4.edu.dto.StudentDto(s) FROM Student s WHERE s.fullName LIKE %:keyword% and (s.studentType = 2 or s.studentType=3)")
    List<StudentDto> findStudentTTByName(@Param("keyword") String keyword);

}
