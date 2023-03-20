package com.group4.edu.domain.core;

import com.group4.edu.domain.User;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;
import java.util.Objects;

public class EntityAuditListener {
    @PrePersist
    public void beforePersit(AuditableEntity auditableEntity) {
        if (SecurityContextHolder.getContext().getAuthentication() != null && !SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
            return;
        }
        Date date = new Date();
        auditableEntity.setCreateDate(date);
        auditableEntity.setModifyDate(date);
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication instanceof AnonymousAuthenticationToken)) {
                Object userDetails =  SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                if (userDetails instanceof UserDetails) {
                    UserDetails principal = (UserDetails) userDetails;
                    if (Objects.nonNull(principal)) {
                        auditableEntity.setCreateBy(principal.getUsername());
                        auditableEntity.setModifyBy(principal.getUsername());
                    }
                }
            } else {
                auditableEntity.setCreateBy("ADMIN");
                auditableEntity.setModifyBy("ADMIN");
            }
        }
    }

    @PreUpdate
    public void beforeMerge(AuditableEntity auditableEntity) {
        if (SecurityContextHolder.getContext().getAuthentication() != null && !SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
            return;
        }
        Date date = new Date();
        auditableEntity.setModifyDate(date);
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication instanceof AnonymousAuthenticationToken)) {
                Object userDetails = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                if (userDetails instanceof UserDetails) {
                    UserDetails principal = (UserDetails) userDetails;
                    if (Objects.nonNull(principal)) {
                        auditableEntity.setModifyBy(principal.getUsername());
                    }
                }
            } else {
                auditableEntity.setModifyBy("admin");
            }
        }
    }

}
