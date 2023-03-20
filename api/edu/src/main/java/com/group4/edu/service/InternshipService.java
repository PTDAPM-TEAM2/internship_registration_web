package com.group4.edu.service;

import com.group4.edu.dto.InternshipDto;
import com.group4.edu.dto.RegisterinternshipDto;
import com.group4.edu.dto.Search.StudentSearchDto;
import com.group4.edu.dto.StudentDto;
import com.group4.edu.dto.StudentInternshipFilterDto;

import java.util.List;

public interface InternshipService {
    InternshipDto registerOrUpdateIntership(RegisterinternshipDto dto, Long InternshipId) throws Exception;

    public InternshipDto getIntershipByCurrentUser();

    public StudentInternshipFilterDto getStudentByfilter(StudentSearchDto dto);

    public List<StudentDto> findStudentByDto(StudentSearchDto dto);
}
