package com.group4.edu.repositories;

import com.group4.edu.domain.RegisterTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface RegisterTimeRepository extends JpaRepository<RegisterTime,Long> {
    @Query("select e from RegisterTime e where e.semester.code = ?1 and e.type = ?2")
    List<RegisterTime> getBySemesterCodeAndType(String code,Integer type);
}
