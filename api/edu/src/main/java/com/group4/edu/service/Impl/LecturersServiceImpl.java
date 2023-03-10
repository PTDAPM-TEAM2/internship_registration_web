package com.group4.edu.service.Impl;

import com.group4.edu.EduConstants;
import com.group4.edu.domain.Account;
import com.group4.edu.domain.Lecturer;
import com.group4.edu.domain.Role;
import com.group4.edu.dto.LecturersDto;
import com.group4.edu.repositories.LecturerRepository;
import com.group4.edu.repositories.RoleRepository;
import com.group4.edu.service.LecturersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class LecturersServiceImpl implements LecturersService {
    @Autowired
    private LecturerRepository lecturerRepository;
    @Autowired
    private RoleRepository roleRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Override
    public LecturersDto saveOrUpdate(LecturersDto dto, Long id) throws Exception {
        if(dto != null){
            if(dto.getLecturersCode() == null){
                throw new Exception("Mã giảng viên bị trống");
            }
            if(dto.getFullName() == null){
                throw new Exception("Tên giảng viên bị trống");
            }
            boolean isNewAccount = false;
            Lecturer entity = null;
            Account account = null;
            if(id != null){
                entity = lecturerRepository.findById(id).orElse(null);
            }
            if(entity == null && dto.getId() != null){
                entity = lecturerRepository.findById(dto.getId()).orElse(null);
            }
            if(entity == null){
                if(lecturerRepository.existsByLecturersCode(dto.getLecturersCode())){
                    throw new Exception("Ma giang vien da ton tai");
                }
                entity = new Lecturer();
                isNewAccount = true;
            }
            else {
                if(!dto.getLecturersCode().equals(entity.getLecturersCode())&& lecturerRepository.existsByLecturersCode(dto.getLecturersCode())){
                    throw new Exception("Ma giảng viên đã tồn tại");
                }
            }
            entity.setLecturersCode(dto.getLecturersCode());
            entity.setFullName(dto.getFullName());
            entity.setEmail(dto.getEmail());
            entity.setAddress(dto.getAddress());
            entity.setDateOfBirth(dto.getDateOfBirth());
            entity.setUserType(EduConstants.UserType.LECTURERS.getValue());
            if(isNewAccount){
                account = new Account();
                account.setUsername(dto.getLecturersCode());
                account.setPassword(passwordEncoder.encode(dto.getLecturersCode()));
                account.setUser(entity);
                Role role = roleRepository.findByRole(EduConstants.Role.ROLELECTURERS.getValue());
                if(role == null){
                    role = new Role();
                    role.setRole(EduConstants.Role.ROLELECTURERS.getValue());
                    role = roleRepository.save(role);
                }
//                Set<AccountRole> accountRoleSet = new HashSet<>();
//                AccountRole accountRole = new AccountRole();
//                accountRole.setAccount(account);
//                accountRole.setRole(role);
//                accountRoleSet.add(accountRole);
//                account.setAccountRoleSet(accountRoleSet);
            }
            entity.setAccount(account);
            return new LecturersDto(lecturerRepository.save(entity));
        }
        return null;
    }

    @Override
    public List<LecturersDto> getAll() {
        return lecturerRepository.getAll();
    }
}
