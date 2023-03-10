package com.group4.edu.service.Impl;

import com.group4.edu.domain.GraduationThesis;
import com.group4.edu.domain.Lecturer;
import com.group4.edu.domain.RegisterTime;
import com.group4.edu.domain.Student;
import com.group4.edu.dto.GraduationThesisDto;
import com.group4.edu.dto.SearchObjectDto;
import com.group4.edu.repositories.GraduationThesisRepository;
import com.group4.edu.repositories.LecturerRepository;
import com.group4.edu.repositories.RegisterTimeRepository;
import com.group4.edu.repositories.StudentRepository;
import com.group4.edu.service.GraduationThesisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Service
public class GraduationThesisServiceImpl implements GraduationThesisService {
    @PersistenceContext
    EntityManager manager;

    @Autowired
    GraduationThesisRepository graduationThesisRepository;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    RegisterTimeRepository registerTimeRepository;
    @Autowired
    LecturerRepository lecturerRepository;
    //
    public GraduationThesisDto save (GraduationThesisDto dto) throws Exception {
        if(dto == null){
            throw new Exception("Hãy nhập thông tin");
        }
        GraduationThesis entity = null;

        if(dto.getId() != null){
            entity = graduationThesisRepository.findById(dto.getId()).orElse(null);
        }
        if(entity == null){
            entity = new GraduationThesis();
            if(dto.getStudent() != null && dto.getStudent().getId() != null
                    && dto.getRegisterTime() != null && dto.getRegisterTime().getId() != null ){
                List<GraduationThesisDto> graduationThesis = graduationThesisRepository.getAllBySVAndRegisterTime(dto.getStudent().getId(), dto.getRegisterTime().getId());
                if(graduationThesis != null && graduationThesis.size() > 0){
                    throw new Exception("Sinh viên đã có đồ án");
                }
            }
        }

        if(dto.getNameGraduationThesis() != null){
            entity.setNameGraduationThesis(dto.getNameGraduationThesis());
        }

        if(dto.getMark1() != null){
            entity.setMark1(dto.getMark1());
        }
        if(dto.getMark2() != null){
            entity.setMark1(dto.getMark2());
        }
        if(dto.getMark3() != null){
            entity.setMark3(dto.getMark3());
        }
        if(dto.getMark1() != null && dto.getMark2() != null && dto.getMark3() != null){
            entity.setAvgMark((dto.getMark1() + dto.getMark2() + dto.getMark3())/3);
        }

        // để set được isAccept và status: thì phải là id của giáo viên phải đúng với giáo viên người dùng chọn hoặc id admin
        if(dto.getUrlOutline() != null){
            entity.setUrlOutline((dto.getUrlOutline()));
        }
        if(dto.getStatus() != null){
            entity.setStatus(dto.getStatus());
        }
        if(dto.getIsAccept() != null){
            entity.setIsAccept((dto.getIsAccept()));
        }
        if(dto.getStudent() != null && dto.getStudent().getId() != null){
            Student student = studentRepository.findById(dto.getStudent().getId()).orElse(null);
            if(student == null){
                throw new Exception("Sinh viên không tồn tại");
            }
            entity.setStudent(student);
        }
        if(dto.getRegisterTime() != null && dto.getRegisterTime().getId() != null){
            RegisterTime registerTime = registerTimeRepository.findById(dto.getRegisterTime().getId()).orElse(null);
            if(registerTime == null){
                throw new Exception("Học kỳ không tồn tại");
            }
            entity.setRegisterTime(registerTime);
        }
        if(dto.getLecturer() != null && dto.getLecturer().getId() != null){
            Lecturer lecturer = lecturerRepository.findById(dto.getLecturer().getId()).orElse(null);
            if(lecturer == null){
                throw new Exception("Giảng viên không tồn tại");
            }
            entity.setLecturer(lecturer);
        }
        if(dto.getIsAccept()!=null && dto.getIsAccept() == 0){
            if(entity.getLecturer() != null){
                entity.setLecturer(null);
            }
        }
        entity = graduationThesisRepository.save(entity);
        return new GraduationThesisDto(entity);
    }

    // xem thông tin đồ án
    public GraduationThesisDto getById(Long id) throws Exception {
        GraduationThesis graduationThesis = graduationThesisRepository.findById(id).orElse(null);
        if(graduationThesis == null){
            throw new Exception("Do an khong ton tai");
        }
        return new GraduationThesisDto(graduationThesis);
    }

    // cái này để lấy được danh sách đồ án và sinh viên
    public List<GraduationThesisDto> getGraduationThesis(SearchObjectDto dto){
        String whereClause = " where true = true ";
        String sql = "SELECT new com.group4.edu.dto.GraduationThesisDto(entity) FROM GraduationThesis as entity";
//        sql += "  INNER JOIN Student s ON entity.student.id = s.id ";

        if (dto.getStatus() != null) {
//            sql += "  INNER JOIN Student s ON entity.student.id = s.id ";
            whereClause += " AND (entity.status = :status)";
        }
        if(dto.getLecturerId() != null){
            whereClause += " AND (entity.lecturer.id = :lecturerId)";
        }
        if(dto.getIsAccept() != null){
            whereClause += " AND (entity.isAccept = :isAccept)";
        }

        sql += whereClause;
        Query query = manager.createQuery(sql, GraduationThesisDto.class);

        if (dto.getStatus() != null) {
            query.setParameter("status", dto.getStatus());
        }
        if(dto.getLecturerId() != null){
            query.setParameter("lecturerId", dto.getLecturerId());
        }
        if(dto.getIsAccept() != null){
            query.setParameter("isAccept", dto.getIsAccept());
        }
        List<GraduationThesisDto> entities = query.getResultList();
        return entities;
    }
}