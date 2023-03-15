package com.group4.edu.repositories;

import com.group4.edu.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company,Long> {
    @Query("select e from Company e where e.email = ?1")
    Optional<Company> findByEmail(String email);
    @Query("select e from Company e where e.phoneNumber = ?1")
    Optional<Company> findByPhoneNumber(String phoneNumber);
}
