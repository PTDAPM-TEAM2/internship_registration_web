package com.group4.edu.dto;

import com.group4.edu.domain.Account;
import com.group4.edu.domain.AccountRole;

import java.util.HashSet;
import java.util.Set;

public class AccountDto extends BaseDto {
    String username;
    String password;
    private Set<RoleDto> roles;

    public AccountDto(Account entity){
        this.setId(entity.getId());
        this.username = entity.getUsername();
        if(entity.getAccountRoleSet() != null && entity.getAccountRoleSet().size()>0){
            this.roles = new HashSet<>();
            for(AccountRole accountRole: entity.getAccountRoleSet()){
                this.roles.add(new RoleDto(accountRole.getRole()));
            }
        }
    }

    public AccountDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<RoleDto> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleDto> roles) {
        this.roles = roles;
    }
}
