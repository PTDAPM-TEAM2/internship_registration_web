package com.group4.edu.repositories;

import com.group4.edu.domain.GraduationThesis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface GraduationThesisRepository extends JpaRepository<GraduationThesis,Long> {
}
