package com.group4.edu.service;

import com.group4.edu.dto.UserDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface UserService {
//    UserDto saveOrUpdate(UserDto userDto);
    List<UserDto> getAll();

    Object getCurrentUser();
}
