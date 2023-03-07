package com.group4.edu.domain;

import com.group4.edu.domain.core.BaseObject;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_role")
public class Role extends BaseObject {
    @Column(nullable = false, unique = true)
    String role;

    @Column(unique = true)
    Integer code;
    String decription;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDecription() {
        return decription;
    }

    public void setDecription(String decription) {
        this.decription = decription;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
