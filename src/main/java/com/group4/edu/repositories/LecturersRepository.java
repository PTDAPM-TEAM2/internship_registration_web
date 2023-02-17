package com.group4.edu.repositories;

import com.group4.edu.domain.Lecturers;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.dto.LecturersDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LecturersRepository extends JpaRepository<Lecturers,Long> {
    @Query("select new com.group4.edu.dto.LecturersDto(e) from Lecturers e")
    List<LecturersDto> getAll();

    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Lecturers e where e.lecturersCode =?1 and e.id != ?2")
    public Boolean existsByLecturersCodeExceptById(String code, Long id);

    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Lecturers e where e.lecturersCode =?1")
    public Boolean existsByLecturersCode(String code);
}
