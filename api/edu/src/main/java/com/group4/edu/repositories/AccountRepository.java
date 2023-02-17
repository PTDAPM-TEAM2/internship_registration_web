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
    Account findByUsername(String username);
    @Query("select new com.group4.edu.dto.AccountDto(e) from Account e")
    List<AccountDto> getAll();
}
