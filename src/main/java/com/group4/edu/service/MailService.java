package com.group4.edu.service;

import com.group4.edu.dto.MailDto;

public interface MailService {
    String sendSimpleMail(MailDto details);

    // Method
    // To send an email with attachment
    String sendMailWithAttachment(MailDto details);
}
