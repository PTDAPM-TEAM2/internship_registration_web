package com.group4.edu.service;

import com.group4.edu.dto.*;
import com.group4.edu.dto.Search.StudentSearchDto;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface InternshipService {
    InternshipDto registerOrUpdateIntership(RegisterinternshipDto dto, Long InternshipId) throws Exception;

    public InternshipDto getIntershipByCurrentUser();

    public StudentInternshipFilterDto getStudentByfilter(StudentSearchDto dto);

    public List<StudentDto> findStudentByDto(StudentSearchDto dto);

    public List<InternshipDto> regsiterMany(RegsiterManySt dto);

    public  void exportInternship (Long internshipId, WebRequest request, HttpServletResponse response);
}
