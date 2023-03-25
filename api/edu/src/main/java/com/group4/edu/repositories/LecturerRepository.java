package com.group4.edu.repositories;

import com.group4.edu.domain.Lecturer;
import com.group4.edu.dto.LecturerDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LecturerRepository extends JpaRepository<Lecturer,Long> {
    @Query("select new com.group4.edu.dto.LecturerDto(e) from Lecturer e")
    List<LecturerDto> getAll();

    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Lecturer e where e.lecturersCode =?1 and e.id != ?2")
    public Boolean existsByLecturersCodeExceptById(String code, Long id);

    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Lecturer e where e.lecturersCode =?1")
    public Boolean existsByLecturersCode(String code);

    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Lecturer e where e.IdNumber=?1")
    public Boolean existsByIdNumber(String idNumber);

}
