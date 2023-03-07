package com.group4.edu;

import com.group4.edu.domain.*;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.repositories.*;
import com.group4.edu.service.AccountService;
import com.group4.edu.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@SpringBootApplication
public class EduApplication {
    public static void main(String[] args) {
        SpringApplication.run(EduApplication.class, args);
    }

}
