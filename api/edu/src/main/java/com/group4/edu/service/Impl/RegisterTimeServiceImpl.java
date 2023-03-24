package com.group4.edu.service.Impl;


import com.group4.edu.EduConstants;
import com.group4.edu.domain.RegisterTime;
import com.group4.edu.domain.Semester;
import com.group4.edu.dto.RegisterTimeDto;
import com.group4.edu.repositories.RegisterTimeRepository;
import com.group4.edu.repositories.SemesterRepository;
import com.group4.edu.service.RegisterTimeService;
import com.group4.edu.until.SemesterDateTimeUntil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class RegisterTimeServiceImpl implements RegisterTimeService {
    @Autowired
    RegisterTimeRepository registerTimeRepository;
    @Autowired
    private SemesterRepository semesterRepository;
    @Override
    public RegisterTimeDto save(RegisterTimeDto dto, Integer type) throws Exception {
        if(dto == null){
            throw new Exception("Thông tin thời gian đang bị trống");
        }
        RegisterTime entity = null;
        if(dto.getId() != null){
            entity = registerTimeRepository.findById(dto.getId()).orElse(null);
        }
        if(entity == null){
            entity = new RegisterTime();
        }
        if(dto.getTimeEnd() != null){
            entity.setTimeEnd(dto.getTimeEnd());
        }else {
            throw new Exception("Thông tin thời gian kêt thúc đang bị trống");
        }
        if(dto.getTimeStart() != null){
            entity.setTimeStart(dto.getTimeStart());
        }else {
            throw new Exception("Thông tin thời gian bắt đầu đang bị trống");
        }
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        Date date = formatter.parse(EduConstants.dateDefaultSemster);
        String code = SemesterDateTimeUntil.getSemesterCodeByDate(date);
        Semester semester = semesterRepository.getSemesterByCode(code).orElse(null);
        entity.setSemester(semester);
        entity.setType(type);
        entity = registerTimeRepository.save(entity);
        return new RegisterTimeDto(entity);
    }

    @Override
    public RegisterTimeDto getLast() {
        String semesterCode = SemesterDateTimeUntil.getCodeSemesterDefault();
        List<RegisterTime> registerTimeDtos = registerTimeRepository.getBySemesterCodeAndType(semesterCode,2);
        if(registerTimeDtos != null && registerTimeDtos.size()>0){
            return new RegisterTimeDto(registerTimeDtos.get(registerTimeDtos.size()-1));
        }
        return null;
    }
}