package com.group4.edu;

import com.group4.edu.domain.Role;

public class EduConstants {
    public static final String dateDefaultSemster = "12-03-2023";
    public static String hederAuthorization = "authorization";
    public static final String PATH_FOLDER_PUBLIC = System.getProperty("user.dir")+"\\src\\public\\";
    public static final String PATH_UPLOAD_OUTLINE = PATH_FOLDER_PUBLIC+"outline\\";
    public static final String RESOURCE_FOLDER_PUBLIC = "/public/";
    public static final String RESOURCE_FOLDER_OUTLINE_PUBLIC = RESOURCE_FOLDER_PUBLIC +"outline/";
    public static enum Role {
        ROLEADMIN(1,"ADMIN"), ROLESTUDENT_DA(3,"STUDENT_DA"),ROLESTUDENT_TT(4,"STUDENT_TT") , ROLELECTURERS(2,"LECTURER");
        private int key;
        private String value;
        private Role(int key, String value){
            this.value = value;
            this.key = key;
        }

        public String getValue() {
            return value;
        }
        public int getKey(){return key;}
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

    public static enum StudentType{
        STUDENT_DA(1), STUDENT_TT(2), ALL(3);
        private int value;
        private StudentType(Integer value){
            this.value = value;
        }

        public Integer getValue() {
            return value;
        }
    }
    public static enum RequestNotAuth{
        LOGIN("/login"),CREATEADMIN("/create-user-admin");
        private String value;
        private RequestNotAuth(String value){
            this.value = value;
        }
        public String getValue(){
            return value;
        }
    }
    public static enum RegisterTimeType{
        DA(1),TT(2);
        private Integer value;
        public Integer getValue(){
            return value;
        }
        private RegisterTimeType(Integer value){
            this.value = value;
        }
    }
}
