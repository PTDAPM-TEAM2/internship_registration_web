package com.group4.edu.service;

import com.group4.edu.dto.MailDto;

public interface MailService {
    Boolean sendSimpleMail(MailDto details);

    // Method
    // To send an email with attachment
    Boolean sendMailWithAttachment(MailDto details);
}
