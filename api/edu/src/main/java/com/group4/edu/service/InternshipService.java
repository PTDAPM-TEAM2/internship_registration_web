package com.group4.edu.service;

import com.group4.edu.dto.InternshipDto;
import com.group4.edu.dto.RegisterinternshipDto;

public interface InternshipService {
    InternshipDto registerOrUpdateIntership(RegisterinternshipDto dto, Long InternshipId) throws Exception;

    public InternshipDto getIntershipByCurrentUser();
}
