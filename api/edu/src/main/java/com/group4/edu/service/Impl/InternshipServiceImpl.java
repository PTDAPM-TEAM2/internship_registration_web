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
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URLConnection;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.group4.edu.EduConstants.RESOURCE_FOLDER_OUTLINE_PUBLIC;

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
        Company company = null;
        UserDto user = (UserDto) userService.getCurrentUser();
        if(user == null){
            return null;
        }
        //Nếu là sv thì người dùng hiện tại phải là sv và đăng trong thời gian được phép đk
        //tim công ty theo sđt và mst. k có thì tạo mới
        if(user.isStudent()){
            if(dto.getCompany() != null && dto.getCompany().getId() != null){
                dto.setCompanyId(dto.getCompany().getId());
            }
            this.validateRegisterInternShip(dto,true);
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
            company = companyRepository.findByTaxCode(dto.getTaxCode()).orElse(null);
            if(company == null){
                company = companyRepository.findByPhoneNumber(dto.getPhoneNumber()).orElse(null);
            }
            if(company == null){
                company  = new Company();
                company.setNameCompany(dto.getNameCompany());
                company.setAddress(dto.getAddress());
                company.setEmail(dto.getEmail());
                company.setPhoneNumber(dto.getPhoneNumber());
                company.setTaxCode(dto.getTaxCode());
                company = companyRepository.save(company);
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
                throw new Exception("Không tìm thấy sinh viên");
            }
            if(dto.getStudentCode() != null)
                student = studentRepository.findByStudentCode(dto.getStudentCode()).orElse(null);
            if(student == null && dto.getStudentId() != null)
                student = studentRepository.findById(dto.getStudentId()).orElse(null);
            company = companyRepository.findById(dto.getCompanyId()).orElse(null);
            if(company == null){
                throw new Exception("Không tìm thấy công ty");
            }
        }
        //Phải là sinh viên trong hệ thống thực tập mới có thể đăng ký thực tâp

        if(student == null || !(student.getStudentType().equals(EduConstants.StudentType.STUDENT_TT.getValue()) || student.getStudentType().equals(EduConstants.StudentType.ALL.getValue()))){
            return null;
        }
        // Nếu tạo mới thì sinh viên đó phải chưa đăng tại kỳ học đó
        if(entity == null){
            List<Internship> internships = intershipRepository.getBySemesterIdAndStudentId(semester.getId(), student.getId());
            if( internships != null && internships.size()>0){
                throw new Exception("Sinh viên đã đăng ký thực tập");
            }
            entity = new Internship();

        }

        if(dto.getCompanyId() != null){
            company = companyRepository.findById(dto.getCompanyId()).orElse(null);
            if(company == null){
                throw  new Exception("Không tìm thấy công ty");
            }
        }
        entity.setCompany(company);
//        company = companyRepository.findByEmail(dto.getEmail()).orElse(null);
//        if(company == null){
//            company = company
//        }
        entity.setStart(dto.getStart());
        entity.setEnd(dto.getEnd());
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

    @Override
    public List<InternshipDto> regsiterMany(RegsiterManySt dto) {
        List<InternshipDto> internshipDtos = new ArrayList<>();
        for(String stCode: dto.getStudentCodes()){
          RegisterinternshipDto registerinternshipDto = new RegisterinternshipDto();
          registerinternshipDto.setStudentCode(stCode);
          registerinternshipDto.setCompanyId(dto.getCompanyId());
          registerinternshipDto.setInternshipPosition("Lao công");
            try {
                internshipDtos.add(this.registerOrUpdateIntership(registerinternshipDto,null));
            } catch (Exception e) {
            }
        }
        return internshipDtos;
    }

    @Override
    public void exportInternship(Long internshipId, WebRequest request, HttpServletResponse response) {
        try {
            String file = EduConstants.RESOURCE_FOLDER_THEME_WORD_PUBLIC + "internship.docx";
            FileInputStream reader = new FileInputStream(new File(file));
            int available = reader.available();
            byte[] data = new byte[available];
            reader.read(data,0,available);
            ServletOutputStream out = response.getOutputStream();
            response.setHeader("Content-Disposition", "attachment; filename="+"internship.docx");
            String contentType = URLConnection.guessContentTypeFromName("internship.docx");
            response.setContentType(FilenameUtils.getExtension(contentType));
            out.write(data);
            response.flushBuffer();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Override
    public List<InternshipDto> importMark(MultipartFile file) {
        XSSFWorkbook workbook = null;
        try {
            workbook = new XSSFWorkbook(file.getInputStream());
        } catch (IOException e) {
            return null;
        }
        XSSFSheet sheet = workbook.getSheetAt(0);
        int rowIndex = 1;
        XSSFRow row = sheet.getRow(rowIndex++);
        List<InternshipDto>internshipDtos = new ArrayList<>();
        String semesterCode = SemesterDateTimeUntil.getCodeSemesterDefault();
        while (row != null && row.getCell(0) != null && StringUtils.hasText(row.getCell(0).getStringCellValue())){
            String studentCode = row.getCell(0).getStringCellValue();
            Internship internship = intershipRepository.getBySemesterCodeAndStudentCode(semesterCode,studentCode).orElse(null);
            if(internship != null){
                internship.setMark(row.getCell(3).getNumericCellValue());
                internship = intershipRepository.save(internship);
                internshipDtos.add(new InternshipDto(internship));
            }
            System.out.println(rowIndex);
            row = sheet.getRow(rowIndex++);
        }
        return internshipDtos;
    }

    private void validateRegisterInternShip(RegisterinternshipDto dto,boolean isSt) throws Exception {
        if(dto.getInternshipPosition() == null){
            throw new Exception("Thiếu thông tin. Vui lòng nhập đủ thông tin");
        }
        if(isSt){
            if(!StringUtils.hasText(dto.getNameCompany()) || !StringUtils.hasText(dto.getEmail())
                    || !StringUtils.hasText(dto.getAddress()) || !StringUtils.hasText(dto.getPhoneNumber()) || !StringUtils.hasText(dto.getTaxCode())){
                throw new Exception("Thiếu thông tin. Vui lòng nhập đủ thông tin");
            }
        }
    }

}
