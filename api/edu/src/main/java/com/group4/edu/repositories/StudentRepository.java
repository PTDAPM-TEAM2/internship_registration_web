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
    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Student e where  e.IdNumber =?1")
    Boolean existsByIdNumber(String idNumber);

    @Query("SELECT new com.group4.edu.dto.StudentDto(s) FROM Student s WHERE s.fullName LIKE %:keyword% and (s.studentType = 2 or s.studentType=3)")
    List<StudentDto> findStudentTTByName(@Param("keyword") String keyword);
    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Student e where e.studentCode =?1 and e.studentType = ?2")
    Boolean existsByStudentCodeAndStudentType(String code, Integer type);

    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Student e where e.IdNumber =?1 and e.studentType = ?2")
    Boolean existsByIdNumberAndStudentType(String idNumber, Integer type);

    @Query(value = "select new com.group4.edu.dto.StudentDto(e.student,e) from GraduationThesis e where e.isAccept = 2 and e.lecturer is null and e.semester.code = ?1")
    List<StudentDto> getStHasLecturerInstructorWithSemesterCode(String semesterCode);

    @Query(value = "select new com.group4.edu.dto.StudentDto(e.student,e) from GraduationThesis e where(e.isAccept = 1 or e.isAccept =0 or e.lecturer is null) and e.semester.code = ?1")
    List<StudentDto> getStnotHasInstructorWithSemesterCode(String semesterCode);

    @Query(value = "select new com.group4.edu.dto.StudentDto(e) from Student e left join GraduationThesis g on e.id = g.student.id where g.id is null or (e.studentType =1 or e.studentType = 3)")
    List<StudentDto> getStNotregister();

    @Query(value = "select new com.group4.edu.dto.StudentDto(e) from Student e left join Internship g on e.id = g.student.id where g.id is null and (e.studentType =2 or e.studentType = 3)")
    List<StudentDto> getStNotHasCompanyInternship();

    @Query(value = "select new com.group4.edu.dto.StudentDto(e.student,e) from Internship e where e.semester.code = ?1")
    List<StudentDto> getStHasCompanyInternshipBySemesterCode(String code);
}
