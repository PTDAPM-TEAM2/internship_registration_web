package com.group4.edu.dto;

public class DataErrorImportExcelDto {
    private int line;
    private String message;

    public DataErrorImportExcelDto(int line, String message) {
        this.line = line;
        this.message = message;
    }

    public DataErrorImportExcelDto() {
    }

    public int getLine() {
        return line;
    }

    public void setLine(int line) {
        this.line = line;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
