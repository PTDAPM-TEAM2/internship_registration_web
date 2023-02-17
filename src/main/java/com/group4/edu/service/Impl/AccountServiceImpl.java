package com.group4.edu.service.Impl;

import com.group4.edu.domain.Account;
import com.group4.edu.domain.AccountRole;
import com.group4.edu.domain.Role;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.dto.RoleDto;
import com.group4.edu.repositories.AccountRepository;
import com.group4.edu.repositories.RoleRepository;
import com.group4.edu.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RoleRepository roleRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public Boolean checkLogin(AccountDto accountDto){
        if(accountDto != null && accountDto.getUsername() != null && accountDto.getPassword() != null){
            Account accountDb = accountRepository.findByUsername(accountDto.getUsername());
            if( accountDb != null&& accountDb.getPassword() != null && passwordEncoder.matches(accountDto.getPassword(), accountDb.getPassword())){
                return  true;
            }
        }
        return false;
    }

    @Override
    public Account loadUserByUsername(String username) {
        if(username != null){
            return accountRepository.findByUsername(username);
        }
        return null;
    }

    @Override
    public AccountDto saveOrUpdate(AccountDto accountDto, Long id, boolean changeUsername) {
        if(accountDto != null && accountDto.getUsername() != null && ! accountDto.getUsername().trim().isEmpty() && accountDto.getPassword() != null && !accountDto.getPassword().isEmpty()){
            Account entity = null;
            if(id != null){
                entity = accountRepository.findById(id).orElse(null);
            }
            if(entity == null && accountDto.getId() != null){
                entity = accountRepository.findById(accountDto.getId()).orElse(null);
            }
            if(entity == null){
                entity = new Account();
            }
            entity.setUsername(accountDto.getUsername());
            entity.setPassword(passwordEncoder.encode(accountDto.getPassword()));
           if(accountDto.getRoles() != null && accountDto.getRoles().size() >0){
               Set<AccountRole> accountRoleSet = new HashSet<>();
               for(RoleDto roleDto: accountDto.getRoles()){
                   Role role = null;
                   if(roleDto.getId() != null){
                       role = roleRepository.findById(roleDto.getId()).orElse(null);
                   }
                   if(role != null){
                       AccountRole accountRole = new AccountRole();
                       accountRole.setAccount(entity);
                       accountRole.setRole(role);
                       accountRoleSet.add(accountRole);
                   }
               }
               if(accountRoleSet!= null && accountRoleSet.size()>0){
                   if(entity.getAccountRoleSet() == null){
                       entity.setAccountRoleSet(accountRoleSet);
                   }
                   else {
                       entity.getAccountRoleSet().clear();
                       entity.getAccountRoleSet().addAll(accountRoleSet);
                   }
               }
           }
            return new AccountDto(accountRepository.save(entity));
        }
        return null;
    }

    public List<AccountDto> getAll(){
        return accountRepository.getAll();
    }


}
