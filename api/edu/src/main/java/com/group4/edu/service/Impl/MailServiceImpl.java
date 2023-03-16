package com.group4.edu.service.Impl;

import com.group4.edu.dto.MailDto;
import com.group4.edu.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") private String sender;

    @Override
    public Boolean sendSimpleMail(MailDto details) {
        try {
//            details = new MailDto();
//            details.setRecipient("luongvannam6898@gmail.com");
//            details.setMsgBody("Test Body");
//            details.setSubject("Test send email spring");

            // Creating a simple mail message
            SimpleMailMessage mailMessage
                    = new SimpleMailMessage();

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            // Sending the mail
            javaMailSender.send(mailMessage);
            return true;
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public Boolean sendMailWithAttachment(MailDto details) {
        return null;
    }
}
