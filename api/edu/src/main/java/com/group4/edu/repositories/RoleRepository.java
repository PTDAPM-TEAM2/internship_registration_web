package com.group4.edu.repositories;

import com.group4.edu.domain.Role;
import com.group4.edu.dto.RoleDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Role e where e.role =?1 and e.role = ?2")
    public Boolean existsByRoleExceptById(String role, Long id);

    @Query(value = "SELECT CASE  WHEN count(e)> 0 THEN true ELSE false END FROM Role e where e.role =?1")
    public Boolean existsByRole(String role);

    @Query("select new com.group4.edu.dto.RoleDto(e) from Role e")
    List<RoleDto> getAll();

    Role findByRole(String role);

    @Query("select r from Role r where r.code = ?1")
    Optional<Role> findByCode(Integer code);

}
