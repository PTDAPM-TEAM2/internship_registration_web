package com.group4.edu.repositories;

import com.group4.edu.domain.Account;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.dto.RoleDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    @Query("select a from Account a where a.username = ?1")
    Account findByUsername(String username);

    @Query("select a.token from Account a where a.username = ?1")
    String getTokenByUsename(String username);
    @Query("select new com.group4.edu.dto.AccountDto(e) from Account e")
    List<AccountDto> getAll();

    @Query(value = "SELECT CASE  WHEN count(a)> 0 THEN true ELSE false END FROM Account a where a.username =?1")
    public Boolean existsByUserName(String username);
}
