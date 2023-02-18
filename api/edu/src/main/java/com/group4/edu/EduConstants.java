package com.group4.edu;

import com.group4.edu.domain.Role;

public class EduConstants {
    public static enum Role {
        ROLEADMIN("ADMIN"), ROLESTUDENT("STUDENT"), ROLELECTURERS("LECTURERS");
        private String value;
        private Role(String value){
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum UserType{
        ADMIN(1),LECTURERS(2),STUDENT(3);
        private Integer value;
        private UserType(Integer value){
            this.value = value;
        }

        public Integer getValue() {
            return value;
        }
    }

    public static enum RequestNotAuth{
        LOGIN("/login");
        private String value;
        private RequestNotAuth(String value){
            this.value = value;
        }
        public String getValue(){
            return value;
        }
    }
}
