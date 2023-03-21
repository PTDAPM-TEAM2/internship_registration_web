package com.group4.edu.service.Impl;

import com.group4.edu.EduConstants;
import com.group4.edu.domain.*;
import com.group4.edu.dto.LecturerDto;
import com.group4.edu.dto.SearchObjectDto;
import com.group4.edu.repositories.*;
import com.group4.edu.service.LecturersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Service
public class LecturersServiceImpl implements LecturersService {
    @PersistenceContext
    EntityManager manager;
    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private IntershipRepository intershipRepository;

    @Autowired
    private GraduationThesisRepository thesisRepository;

    @Autowired
    private RoleRepository roleRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private AccountRepository accountRepository;
    @Override
    public LecturerDto saveOrUpdate(LecturerDto dto, Long id) throws Exception {
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
            entity.setDateOfBirth(dto.getDateOfBirth());
            entity.setIdNumber(dto.getIdNumber());
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
                account = accountRepository.save(account);
            }
            entity.setAccount(account);
            return new LecturerDto(lecturerRepository.save(entity));
        }
        return null;
    }

    @Override
    public List<LecturerDto> getAll() {
        return lecturerRepository.getAll();
    }

    @Override
    public List<LecturerDto> getGraduationThesis(SearchObjectDto dto){
        String whereClause = " where true = true ";
        String sql = "SELECT new com.group4.edu.dto.LecturerDto(tbl_lecturer) FROM Lecturer as tbl_lecturer";


        if(dto.getFullName() != null && StringUtils.hasText(dto.getFullName())){
            whereClause += " AND (tbl_lecturer.fullName like :fullName)";
        }

        if(dto.getNumberOfStudentsInLecturer() != null){
            sql += " inner join GraduationThesis entity on entity.lecturer.id = tbl_lecturer.id  ";
            whereClause += " and (entity.status = 1 or entity.status = 2)";
            if(dto.getNumberOfStudentsInLecturer() == 0)
                whereClause += " group by tbl_lecturer.id HAVING COUNT(entity.id) < 30";
            if(dto.getNumberOfStudentsInLecturer() == 1)
                whereClause += " group by tbl_lecturer.id HAVING COUNT(entity.id) = 30";
            if(dto.getNumberOfStudentsInLecturer() == 2)
                whereClause += " group by tbl_lecturer.id HAVING COUNT(entity.id) > 30";
        }


        sql += whereClause;
        Query query = manager.createQuery(sql, LecturerDto.class);

        if(dto.getFullName() != null && StringUtils.hasText(dto.getFullName())){
            query.setParameter("fullName", '%'+dto.getFullName()+'%');
        }

        List<LecturerDto> entities = query.getResultList();
        return entities;
    }

    @Override
    public boolean deleteLt(Long id) {
        Lecturer lecturer = lecturerRepository.findById(id).orElse(null);
        if (lecturer == null){
            return false;
        }
        try {
            Account account = accountRepository.getAccountByUserId(lecturer.getId()).orElse(null);
            accountRepository.delete(account);

            List<Internship> internships = intershipRepository.getInternshipByLecturerId(lecturer.getId());
            intershipRepository.deleteAll(internships);

            List<GraduationThesis> graduationThesises = thesisRepository.getGraduationThesisByLecturerId(lecturer.getId());
            thesisRepository.deleteAll(graduationThesises);

            if (lecturerRepository.existsById(lecturer.getId()))
                lecturerRepository.deleteById(lecturer.getId());
            return true;
        } catch (Exception e){
            return false;
        }
    }
}
