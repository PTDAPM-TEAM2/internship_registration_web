package com.group4.edu.dto;

import com.group4.edu.domain.Semester;

public class SemesterDto extends BaseDto{
    private String code;
    private Integer indexValue; //Kỳ nào, kỳ càng gần thì index càng lớn
    private Boolean active; //Còn hoạt động hay không
    public SemesterDto(){}
    public SemesterDto(Semester entity){
        this.code = entity.getCode();
        this.indexValue = entity.getIndexValue();
        this.active = entity.getActive();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getIndexValue() {
        return indexValue;
    }

    public void setIndexValue(Integer indexValue) {
        this.indexValue = indexValue;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
