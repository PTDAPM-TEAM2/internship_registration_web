package com.group4.edu.repositories;

import com.group4.edu.domain.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SemesterRepository extends JpaRepository<Semester,Long> {
    @Query("select s from Semester s where s.code =?1")
    Optional<Semester> getSemesterByCode(String code);
    @Query("select s from Semester s where s.active = true ")
    List<Semester> getListSemesterActive();
}
