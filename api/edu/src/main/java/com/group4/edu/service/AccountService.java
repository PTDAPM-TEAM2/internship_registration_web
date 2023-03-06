package com.group4.edu.service;

import com.group4.edu.domain.Account;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.dto.ChangePasswordDto;

import java.util.List;

public interface AccountService {
    public Boolean checkLogin(AccountDto accountDto,Integer type) throws Exception;

    Account loadUserByUsername(String username);

    AccountDto saveOrUpdate(AccountDto accountDto, Long id, boolean changeUsername) throws Exception;

    boolean saveTokenByUsername(String token,String username);

    List<AccountDto> getAll();

    String getTokenByUsername(String username);

    String changePassword(ChangePasswordDto passwordDto);
    void logout();
}
