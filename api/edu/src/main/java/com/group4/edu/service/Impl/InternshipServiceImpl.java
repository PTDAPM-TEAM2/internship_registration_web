package com.group4.edu.service.Impl;

import com.group4.edu.EduConstants;
import com.group4.edu.domain.*;
import com.group4.edu.dto.*;
import com.group4.edu.dto.Search.StudentSearchDto;
import com.group4.edu.repositories.*;
import com.group4.edu.service.InternshipService;
import com.group4.edu.service.StudentService;
import com.group4.edu.service.UserService;
import com.group4.edu.until.SemesterDateTimeUntil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class InternshipServiceImpl implements InternshipService {
    @Autowired
    private UserService userService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SemesterRepository semesterRepository;

    @Autowired
    private RegisterTimeRepository registerTimeRepository;

    @Autowired
    private IntershipRepository intershipRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private StudentService studentService;
    @Override
    public InternshipDto registerOrUpdateIntership(RegisterinternshipDto dto,Long internShipId) throws Exception {
        if(dto == null){
            return null;
        }
        Student student = null;
        UserDto user = (UserDto) userService.getCurrentUser();
        if(user == null){
            return null;
        }
        //Nếu là sv thì người dùng hiện tại phải là sv và đăng trong thời gian được phép đk
        if(user.isStudent()){
            student = studentRepository.findById(user.getId()).orElse(null);
            String code = SemesterDateTimeUntil.getCodeSemesterDefault();
            List<RegisterTime> registerTimeList = registerTimeRepository.getBySemesterCodeAndType(code,EduConstants.RegisterTimeType.TT.getValue());
            if(registerTimeList == null || registerTimeList.size() == 0){
                throw new Exception("Đăng ký không thành công. Thời gian đăng ký thực tập đã hết");
            }
            Date date = new Date();
            for(int i=0;i<registerTimeList.size();i++){
                RegisterTime registerTime = registerTimeList.get(i);
                if(date.after(registerTime.getTimeStart()) && date.before(registerTime.getTimeEnd())){
                    break;
                }
                if(i == registerTimeList.size() -1){
                    throw new Exception("Đăng ký không thành coong.Thời gian đăng ký thực tập đã hết");
                }
            }
        }
        String code = SemesterDateTimeUntil.getCodeSemesterDefault();
        Semester semester = semesterRepository.getSemesterByCode(code).orElse(null);
        if(semester == null){
            return null;
        }
        Internship entity = null;
        if(internShipId != null){
            entity = intershipRepository.findById(internShipId).orElse(null);
        }
        if(entity == null && dto.getInternshipId() != null ){
            entity = intershipRepository.findById(dto.getInternshipId()).orElse(null);
        }
        // Nếu admin thêm thì phải có mã sinh viên hoặc id. Trong trường hớp sửa thì không cần
        if(user.isAdmin() && entity == null){
            if(dto.getStudentCode() == null && dto.getStudentId() == null ){
                return null;
            }
            if(dto.getStudentCode() != null)
                student = studentRepository.findByStudentCode(dto.getStudentCode()).orElse(null);
            if(student == null && dto.getStudentId() != null)
                student = studentRepository.findById(dto.getStudentId()).orElse(null);
        }
        //Phải là sinh viên trong hệ thống thực tập mới có thể đăng ký thực tâp

        if(student == null || !(student.getStudentType().equals(EduConstants.StudentType.STUDENT_TT.getValue()) || student.getStudentType().equals(EduConstants.StudentType.ALL.getValue()))){
            return null;
        }

        // check validate thông tin
        this.validateRegisterInternShip(dto);
        // Nếu tạo mới thì sinh viên đó phải chưa đăng tại kỳ học đó
        if(entity == null){
            List<Internship> internships = intershipRepository.getBySemesterIdAndStudentId(semester.getId(), student.getId());
            if( internships != null && internships.size()>0){
                throw new Exception("Sinh viên đã đăng ký thực tập");
            }
            entity = new Internship();

        }

        // Đoạn công ty này ba chấm quá @@
        Company company = new Company();
        company.setAddress(dto.getAddress());
        company.setCode(dto.getCode());
        company.setNameCompany(dto.getNameCompany());
        company.setEmail(dto.getEmail());
        company.setPhoneNumber(dto.getPhoneNumber());
        company.setDescription(dto.getDescription());
        company.setCode(dto.getCode());
        company = companyRepository.save(company);
        entity.setCompany(company);
//        company = companyRepository.findByEmail(dto.getEmail()).orElse(null);
//        if(company == null){
//            company = company
//        }
        entity.setStudent(student);
        entity.setInternshipPosition(dto.getInternshipPosition());
        entity.setSemester(semester);
        return new InternshipDto(intershipRepository.save(entity));
    }

    @Override
    public InternshipDto getIntershipByCurrentUser() {
        Student student = null;
        UserDto user = (UserDto) userService.getCurrentUser();
        student = studentRepository.findById(user.getId()).orElse(null);
        if(student == null){
            return null;
        }
        List<Internship> internships = intershipRepository.getBySemesterCodeAndStudentId(SemesterDateTimeUntil.getCodeSemesterDefault(),student.getId());
        if(internships != null && internships.size()>0){
            return new InternshipDto(internships.get(0),true);
        }
        return null;
    }

    @Override
    public StudentInternshipFilterDto getStudentByfilter(StudentSearchDto dto) {
        List<StudentDto> studentList = studentService.getStDaBySearch(null,EduConstants.StudentType.STUDENT_TT.getValue());
        List<StudentDto> listSt1 = new ArrayList<>();
        List<StudentDto> listSt2 = new ArrayList<>();
        for(StudentDto studentDto: studentList){
            if(studentDto.getInternship() != null){
                listSt1.add(studentDto);
            }
            else {
                listSt2.add(studentDto);
            }
        }
        StudentInternshipFilterDto studentInternshipFilterDto = new StudentInternshipFilterDto();
        if(dto == null||dto.getInternShipType().equals(1)){
            studentInternshipFilterDto.setListSt1(listSt1);
        }
        if(dto == null|| dto.getInternShipType().equals(2)){
            studentInternshipFilterDto.setListSt2(listSt2);
        }
        return studentInternshipFilterDto;
    }

    @Override
    public List<StudentDto> findStudentByDto(StudentSearchDto dto) {

        return studentRepository.findStudentTTByName(dto == null||dto.getKeySearchName()==null?"":dto.getKeySearchName());
    }

    private void validateRegisterInternShip(RegisterinternshipDto dto) throws Exception {
        if(dto.getAddress() == null || dto.getEmail() == null || dto.getInternshipPosition() == null
            || dto.getNameCompany() == null || dto.getPhoneNumber() == null){
            throw new Exception("Thiếu thông tin. Vui lòng nhập đủ thông tin");
        }
    }

}
