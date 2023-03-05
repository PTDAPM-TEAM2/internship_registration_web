package com.group4.edu.dto;


import com.group4.edu.domain.Company;

public class CompanyDto extends BaseDto {
    private String nameCompany;
    private String email;
    private String phoneNumber;
    private String address;
    private String taxCode;
    private String description;

    public CompanyDto() {
    }

    public CompanyDto(Company entity) {
        this.nameCompany = entity.getNameCompany();
        this.email = entity.getEmail();
        this.phoneNumber = entity.getPhoneNumber();
        this.address = entity.getAddress();
        this.taxCode = entity.getTaxCode();
        this.description = entity.getDescription();
    }

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
}
