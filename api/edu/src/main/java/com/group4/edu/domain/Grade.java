package com.group4.edu.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "tbl_grade")
public class Grade extends BaseObject{
    @Column(unique = true)
    private String name;
    @OneToMany(mappedBy = "grade", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Student> students;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
}
