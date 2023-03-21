package com.group4.edu.service;

import com.group4.edu.domain.Student;
import com.group4.edu.dto.ResponseImportExcelStudentDto;
import com.group4.edu.dto.Search.StudentSearchDto;
import com.group4.edu.dto.StudentDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentService {
    StudentDto saveOrUpdate(StudentDto studentDto,Long id, int studentType) throws Exception;

    List<StudentDto> getAll();
    ResponseImportExcelStudentDto importExcel(MultipartFile file);
    List<StudentDto> getStDaBySearch(StudentSearchDto dto, int type);

    boolean deleteStTT(Long id);
    boolean deleteStDa(Long id);
}
