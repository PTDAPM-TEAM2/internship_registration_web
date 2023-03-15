package com.group4.edu.domain;

import com.group4.edu.domain.core.BaseObject;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_company")
public class Company extends BaseObject {
    private String nameCompany;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String phoneNumber;
    private String address;
    private String code;

    @Column(name = "taxCode", unique = true)
    private String taxCode;
    private String description;

    public String getNameCompany() {
        return nameCompany;
    }

    public void setNameCompany(String nameCompany) {
        this.nameCompany = nameCompany;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
