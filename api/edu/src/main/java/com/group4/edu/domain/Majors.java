package com.group4.edu.domain;

import com.group4.edu.domain.core.BaseObject;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_majors")
public class Majors extends BaseObject {
    private String name;
    private String code;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
