package com.group4.edu.service;

import com.group4.edu.domain.Account;
import com.group4.edu.dto.AccountDto;

import java.util.List;

public interface AccountService {
    public Boolean checkLogin(AccountDto accountDto);

    Account loadUserByUsername(String username);

    AccountDto saveOrUpdate(AccountDto accountDto, Long id, boolean changeUsername);

    List<AccountDto> getAll();
}
