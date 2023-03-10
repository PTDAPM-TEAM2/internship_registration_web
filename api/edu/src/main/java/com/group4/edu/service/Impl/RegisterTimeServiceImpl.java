package com.group4.edu.service.Impl;


import com.group4.edu.domain.RegisterTime;
import com.group4.edu.dto.RegisterTimeDto;
import com.group4.edu.repositories.RegisterTimeRepository;
import com.group4.edu.service.RegisterTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterTimeServiceImpl implements RegisterTimeService {
    @Autowired
    RegisterTimeRepository registerTimeRepository;
    @Override
    public RegisterTimeDto save(RegisterTimeDto dto) throws Exception {
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

        if(dto.getType() != null){
            entity.setType(dto.getType());
        }else {
            throw new Exception("Thể loại thời gian không được trống");
        }


        entity = registerTimeRepository.save(entity);
        return new RegisterTimeDto(entity);
    }
}