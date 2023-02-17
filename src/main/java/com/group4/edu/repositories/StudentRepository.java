package com.group4.edu.repositories;

import com.group4.edu.domain.Student;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.dto.StudentDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Long> {
    @Query("select new com.group4.edu.dto.StudentDto(e) from Student e")
    List<StudentDto> getAll();

    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Student e where e.studentCode =?1")
    public Boolean existsByStudentCode(String code);

    Student findByStudentCode(String studentCode);
}
