package com.group4.edu.dto;

import java.util.List;

public class ResponseImportExcelStudentDto {
    private int totalData;
    private int totalDataSuccess;
    private int getTotalDataError;
    private List<StudentDto> dataSuccess;
    private List<DataErrorImportExcelDto> dataError;

    public ResponseImportExcelStudentDto(int totalData, int totalDataSuccess, int getTotalDataError, List<StudentDto> dataSuccess, List<DataErrorImportExcelDto> dataError) {
        this.totalData = totalData;
        this.totalDataSuccess = totalDataSuccess;
        this.getTotalDataError = getTotalDataError;
        this.dataSuccess = dataSuccess;
        this.dataError = dataError;
    }

    public ResponseImportExcelStudentDto() {
    }

    public int getTotalData() {
        return totalData;
    }

    public void setTotalData(int totalData) {
        this.totalData = totalData;
    }

    public int getTotalDataSuccess() {
        return totalDataSuccess;
    }

    public void setTotalDataSuccess(int totalDataSuccess) {
        this.totalDataSuccess = totalDataSuccess;
    }

    public int getGetTotalDataError() {
        return getTotalDataError;
    }

    public void setGetTotalDataError(int getTotalDataError) {
        this.getTotalDataError = getTotalDataError;
    }

    public List<StudentDto> getDataSuccess() {
        return dataSuccess;
    }

    public void setDataSuccess(List<StudentDto> dataSuccess) {
        this.dataSuccess = dataSuccess;
    }

    public List<DataErrorImportExcelDto> getDataError() {
        return dataError;
    }

    public void setDataError(List<DataErrorImportExcelDto> dataError) {
        this.dataError = dataError;
    }
}
