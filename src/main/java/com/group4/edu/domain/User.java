package com.group4.edu.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tbl_user")
@Inheritance(
        strategy = InheritanceType.JOINED
)
public class User extends BaseObject{
    private String fullName;
    private String email;
    private Date dateOfBirth;
    private String address;
    private Integer userType;

    @OneToOne(mappedBy = "user")
    private Account account;

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

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }
}
