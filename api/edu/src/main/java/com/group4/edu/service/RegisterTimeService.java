package com.group4.edu.service;


import com.group4.edu.dto.RegisterTimeDto;

public interface RegisterTimeService {
    RegisterTimeDto save(RegisterTimeDto dto,Integer type) throws Exception;
    RegisterTimeDto getLast();
}
