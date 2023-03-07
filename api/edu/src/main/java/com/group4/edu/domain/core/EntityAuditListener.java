package com.group4.edu.domain.core;

import com.group4.edu.domain.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.security.Security;
import java.util.Date;
import java.util.Objects;

public class EntityAuditListener {
    @PrePersist
    public void beforePersit(AuditableEntity auditableEntity) {
        Date date = new Date();
        auditableEntity.setCreateDate(date);
        auditableEntity.setModifyDate(date);
        if(SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (Objects.nonNull(userDetails)) {
                auditableEntity.setCreateBy(userDetails.getUsername());
                auditableEntity.setModifyBy(userDetails.getUsername());
            } else {
                auditableEntity.setCreateBy("admin");
            }
        }
    }

    @PreUpdate
    public void beforeMerge(AuditableEntity auditableEntity) {
        Date date = new Date();
        auditableEntity.setModifyDate(date);
        if(SecurityContextHolder.getContext().getAuthentication() != null) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (Objects.nonNull(userDetails)) {
            auditableEntity.setModifyBy(userDetails.getUsername());
        } else {
            auditableEntity.setModifyBy(userDetails.getUsername());
        }}
    }

}
