package com.group4.edu.service;

import com.group4.edu.dto.*;
import com.group4.edu.dto.Search.StudentSearchDto;

import java.util.List;

public interface InternshipService {
    InternshipDto registerOrUpdateIntership(RegisterinternshipDto dto, Long InternshipId) throws Exception;

    public InternshipDto getIntershipByCurrentUser();

    public StudentInternshipFilterDto getStudentByfilter(StudentSearchDto dto);

    public List<StudentDto> findStudentByDto(StudentSearchDto dto);

    public List<InternshipDto> regsiterMany(RegsiterManySt dto);
}
