package com.group4.edu.dto;

import com.group4.edu.domain.User;

import java.util.Date;

public class UserDto extends BaseDto{
    private String fullName;
    private String email;
    private Date dateOfBirth;
    private String address;

    private AccountDto account;

    private Integer userType;

    public UserDto(User entity){
        this.fullName = entity.getFullName();
        this.email = entity.getEmail();
        this.dateOfBirth = entity.getDateOfBirth();
        this.address = entity.getAddress();
    }

    public UserDto(User entity, boolean getAccount){
        this.fullName = entity.getFullName();
        this.email = entity.getEmail();
        this.dateOfBirth = entity.getDateOfBirth();
        this.address = entity.getAddress();
        if(getAccount){
            if(entity.getAccount() != null){
                this.account = new AccountDto(entity.getAccount());
            }
        }
    }

    public UserDto() {
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public AccountDto getAccount() {
        return account;
    }

    public void setAccount(AccountDto account) {
        this.account = account;
    }
}
