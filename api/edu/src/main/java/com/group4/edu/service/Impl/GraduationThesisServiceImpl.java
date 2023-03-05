package com.group4.edu.service.Impl;

import com.group4.edu.dto.GraduationThesisDto;
import com.group4.edu.dto.SearchObjectDto;
import com.group4.edu.service.GraduationThesisService;
import org.springframework.stereotype.Service;

import javax.persistence.Query;
import java.util.List;

@Service
public class GraduationThesisServiceImpl implements GraduationThesisService {
    public javax.persistence.EntityManager manager;
    public List<GraduationThesisDto> getGraduationThesis(SearchObjectDto dto){
        String whereClause = " where ";
        String sql = "SELECT new com.group4.edu.dto.GraduationThesisDto(entity) FROM GraduationThesis as entity";
        sql += "  INNER JOIN Student s ON entity.student.id = s.id ";

//        whereClause += " AND (t.id = :userservice)";


        sql += whereClause;
        Query query = manager.createQuery(sql, GraduationThesisDto.class);
//
//        if (SecurityUtils.getCurrentUser() != null) {
//            query.setParameter("userservice", SecurityUtils.getCurrentUser().getId());
//            qCount.setParameter("userservice", SecurityUtils.getCurrentUser().getId());
//        }

        List<GraduationThesisDto> entities = query.getResultList();
        return entities;
    }
}