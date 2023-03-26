package com.group4.edu.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.sql.DataSource;
import java.util.Scanner;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/public/**")
                .addResourceLocations("file:///"+System.getProperty("user.dir")+"\\src\\public\\");
        System.out.println(System.getProperty("user.dir")+"\\src\\public\\");
    }
    @Bean
    public DataSource dataSource() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Lua chon loai db muon ket noi");
        System.out.println("1. Host DB(DB dung chung)");
        System.out.println("2. Local DB(DB chi dung tren may)");
        System.out.print("Nhap lua chon:");
        int x = Integer.parseInt(sc.nextLine());
        String host = "";
        String username = "";
        String password = "";
        String dbName = "";
        if(x == 1){
            host = "s88d81.cloudnetwork.vn:3306";
            username = "kin82682_group4Edu";
            dbName = "kin82682_Education";
            password = "nam689nam986";
        }
        if(x == 2){
            System.out.print("Nhap port: ");
            host = sc.nextLine();
            host = "localhost:"+host;
            System.out.print("Nhap username:");
            username = sc.nextLine();
            System.out.print("Nhap password:");
            password = sc.nextLine();
            dbName = "education";
        }
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://"+host+"/"+dbName+"?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull&allowPublicKeyRetrieval=true&useSSL=false&sessionVariables=sql_mode='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION'");
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}
