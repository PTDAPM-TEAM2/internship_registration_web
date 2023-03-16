package com.group4.edu.service.Impl;

import com.group4.edu.EduConstants;
import com.group4.edu.domain.*;
import com.group4.edu.dto.*;
import com.group4.edu.repositories.*;
import com.group4.edu.service.GraduationThesisService;
import com.group4.edu.service.UserService;
import com.group4.edu.until.SemesterDateTimeUntil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
    @Autowired
    private UserService userService;

    @Autowired
    private SemesterRepository semesterRepository;
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
                    && dto.getSemester() != null && dto.getSemester().getId() != null ){
                List<GraduationThesisDto> graduationThesis = graduationThesisRepository.getAllByStIdAndSemesterId(dto.getStudent().getId(), dto.getSemester().getId());
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
        if(dto.getStatus() != null){
            entity.setStatus(dto.getStatus());
        }
        if(dto.getIsAccept() != null){
            entity.setIsAccept((dto.getIsAccept()));
        }
        if(dto.getStudent() != null && dto.getStudent().getId() != null){
            Student student = studentRepository.findById(dto.getStudent().getId()).orElse(null);
            if(student == null||!(student.getStudentType().equals(EduConstants.StudentType.STUDENT_DA.getValue()) || student.getStudentType().equals(EduConstants.StudentType.ALL.getValue()))){
                throw new Exception("Sinh viên không tồn tại");
            }
            entity.setStudent(student);
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
        //
        String code = SemesterDateTimeUntil.getCodeSemesterDefault();
        Semester semester = semesterRepository.getSemesterByCode(code).orElse(null);
        entity.setSemester(semester);
        entity = graduationThesisRepository.save(entity);

        // set số lượng sinh viên làm đồ án mà giáo viên tiếp nhận
        if (entity.getLecturer() != null && entity.getLecturer().getId() != null){
            Lecturer lecturer = lecturerRepository.findById(entity.getLecturer().getId()).orElse(null);
            if(lecturer != null){
                lecturer.setNumberOfStudents(graduationThesisRepository.getNumberOfStudents(lecturer.getId()));
                lecturerRepository.save(lecturer);
            }
        }
        return new GraduationThesisDto(entity);
    }

    // xem thông tin đồ án
    @Override
    public GraduationThesisDto getById(Long id) throws Exception {
        GraduationThesis graduationThesis = graduationThesisRepository.findById(id).orElse(null);
        if(graduationThesis == null){
            throw new Exception("Do an khong ton tai");
        }
        return new GraduationThesisDto(graduationThesis);
    }

    @Override
    public GraduationThesisDto getByStudentId(Long id){
        return graduationThesisRepository.getByStudentIdDto(id);
    }
    // cái này để lấy được danh sách đồ án và sinh viên
    public List<GraduationThesisDto> getGraduationThesis(SearchObjectDto dto){
        String whereClause = " where true = true and (entity.status = 1 or entity.status = 0 or entity.status is null)";
        String sql = "SELECT new com.group4.edu.dto.GraduationThesisDto(entity) FROM GraduationThesis as entity";
//        sql += "  INNER JOIN Student s ON entity.student.id = s.id ";

        if (dto.getIsAccept() != null) {
//            sql += "  INNER JOIN Student s ON entity.student.id = s.id ";
            if(dto.getIsAccept() == 3){
                whereClause += " AND (entity.isAccept = 1 OR entity.isAccept = 0 OR entity.isAccept = :isAccept)";
            }else {
                whereClause += " AND (entity.isAccept = :isAccept)";
            }
        }
        if(dto.getLecturerId() != null){
            whereClause += " AND (entity.lecturer.id = :lecturerId)";
        }
//        if(dto.getIsAccept() != null){
//            whereClause += " AND (entity.isAccept = :isAccept)";
//        }

        if(dto.getFullName() != null && StringUtils.hasText(dto.getFullName())){
            whereClause += " AND (entity.student.fullName like :fullName)";
        }
        sql += whereClause;
        Query query = manager.createQuery(sql, GraduationThesisDto.class);

//        if (dto.getStatus() != null) {
//            query.setParameter("status", dto.getStatus());
//        }
        if(dto.getLecturerId() != null){
            query.setParameter("lecturerId", dto.getLecturerId());
        }
        if(dto.getIsAccept() != null){
            query.setParameter("isAccept", dto.getIsAccept());
        }
        if(dto.getFullName() != null && StringUtils.hasText(dto.getFullName())){
            query.setParameter("fullName", '%'+dto.getFullName()+'%');
        }

        List<GraduationThesisDto> entities = query.getResultList();
        return entities;
    }

    @Override
    public GraduationThesisDto addOutline(MultipartFile file) throws Exception {
        if(file == null){
            return null;
        }
        Student student = null;
        try {
            UserDto studentDto = (UserDto) userService.getCurrentUser();
            if(studentDto != null){
                student = studentRepository.findById(studentDto.getId()).orElse(null);
                if(student == null){
                    return null;
                }
            }
        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
            return null;
        }

        String fileName = student.getStudentCode()+ "."+StringUtils.cleanPath(file.getOriginalFilename());
        System.out.println("file upload: "+fileName);
        try {
            // Lưu trữ tệp trong thư mục được chỉ định
            byte[] bytes = file.getBytes();
            Path path = Paths.get(EduConstants.PATH_UPLOAD_OUTLINE + fileName);
            Files.write(path, bytes);
            System.out.println(student.getId());
            List<GraduationThesis> thesis = graduationThesisRepository.getGraduationThesisByStId(student.getId());
            if(thesis != null && thesis.size() >0){
                GraduationThesis thesis1 = thesis.get(0);
                thesis1.setUrlOutline(EduConstants.RESOURCE_FOLDER_OUTLINE_PUBLIC+fileName);
                thesis1 =  graduationThesisRepository.save(thesis1);
                return new GraduationThesisDto(thesis1);
            }
            else {
                throw new Exception("Không tìm thấy đồ án");
            }

        } catch (IOException e) {
            throw  new Exception("Lỗi server");
        }

    }


    // check những thằng nào isAccept == 0 hoặc == 1 thì sẽ được cập lại isAccept và có giáo viên
    @Override
    public List<GraduationThesisDto> setLecturerToStudent (LecturerStudentsDto lecturerStudentsDto){
        List<GraduationThesisDto> graduationThesisDtos = new ArrayList<>();
        if(lecturerStudentsDto == null || lecturerStudentsDto.getIdLecturer() == null
                || lecturerStudentsDto.getIdStudents() == null || lecturerStudentsDto.getIdStudents().size() < 0)
            return null;

        for (Long idStudents : lecturerStudentsDto.getIdStudents()){
            GraduationThesis graduationThesis = graduationThesisRepository.getByStudentId(idStudents);
            if(graduationThesis != null && (graduationThesis.getIsAccept() == 1 || graduationThesis.getIsAccept() == 0
                    || graduationThesis.getIsAccept() == null || graduationThesis.getLecturer() == null)){
                Lecturer leurer = lecturerRepository.findById(lecturerStudentsDto.getIdLecturer()).orElse(null);
                if (leurer == null) {
                    return null;
                }
                graduationThesis.setLecturer(leurer);
                graduationThesis.setIsAccept(2);
                graduationThesis = graduationThesisRepository.save(graduationThesis);
                graduationThesisDtos.add(new GraduationThesisDto(graduationThesis));
            }
        }
        return graduationThesisDtos;
    }
}