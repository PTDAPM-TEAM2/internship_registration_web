package com.group4.edu.repositories;

import com.group4.edu.domain.Company;
import com.group4.edu.dto.CompanyDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company,Long> {
    @Query("select e from Company e where e.email = ?1")
    Optional<Company> findByEmail(String email);
    @Query("select e from Company e where e.phoneNumber = ?1")
    Optional<Company> findByPhoneNumber(String phoneNumber);
    @Query("select e from Company e where e.taxCode = ?1")
    List<Company> findByTaxCode(String phoneNumber);
    @Query("select new com.group4.edu.dto.CompanyDto(e) from Company e")
    List<CompanyDto> getAll();
}
