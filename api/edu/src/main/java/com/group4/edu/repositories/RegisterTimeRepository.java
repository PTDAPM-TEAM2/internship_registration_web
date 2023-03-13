package com.group4.edu.repositories;

import com.group4.edu.domain.RegisterTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface RegisterTimeRepository extends JpaRepository<RegisterTime,Long> {
}
