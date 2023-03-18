package com.group4.edu.controller;

import com.group4.edu.dto.MailDto;
import com.group4.edu.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mail")
public class MailController {
    @Autowired
    private MailService mailService;
    @PostMapping("/send-simple-mail")
    public Boolean sendSimpleMail(@RequestBody MailDto mailDto){
        return mailService.sendSimpleMail(mailDto);
    }
}
