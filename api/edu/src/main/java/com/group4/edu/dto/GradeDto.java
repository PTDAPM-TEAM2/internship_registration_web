package com.group4.edu.dto;

import com.group4.edu.domain.Grade;
import com.group4.edu.domain.Student;

import java.util.HashSet;
import java.util.Set;

public class GradeDto extends BaseDto{
    private String name;

    private Set<StudentDto> students;

    public GradeDto(Grade entity){
        this.setId(entity.getId());
        this.name = entity.getName();
    }
    public GradeDto(Grade entity, boolean getStudent){
        this.setId(entity.getId());
        this.name = entity.getName();
        if(entity.getStudents() != null){
            this.students = new HashSet<>();
            for(Student st: entity.getStudents()){
                this.students.add(new StudentDto(st,true));
            }
        }
    }

    public GradeDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<StudentDto> getStudents() {
        return students;
    }

    public void setStudents(Set<StudentDto> students) {
        this.students = students;
    }
}
