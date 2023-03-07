package com.group4.edu;

import com.group4.edu.domain.*;
import com.group4.edu.dto.AccountDto;
import com.group4.edu.repositories.*;
import com.group4.edu.service.AccountService;
import com.group4.edu.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class CmlRunner implements CommandLineRunner{
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    LecturerRepository lecturerRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private GradeRepository gradeRepository;

//    @Transactional
//    @Bean
//    CommandLineRunner commandLineRunner() {
//        return args -> {
//            Role role = roleRepository.findByRole(EduConstants.Role.ROLEADMIN.getValue());
//            Set<Role> roleSet = new HashSet<>();
//            List<Role> roleList = null;
//            if (role == null) {
//                Role role1 = new Role();
//                Role role2 = new Role();
//                Role role3 = new Role();
//                Role role4 = new Role();
//                role1.setCode(EduConstants.Role.ROLEADMIN.getKey());
//                role1.setRole(EduConstants.Role.ROLEADMIN.getValue());
//                role2.setCode(EduConstants.Role.ROLELECTURERS.getKey());
//                role2.setRole(EduConstants.Role.ROLELECTURERS.getValue());
//                role3.setCode(EduConstants.Role.ROLESTUDENT_DA.getKey());
//                role3.setRole(EduConstants.Role.ROLESTUDENT_DA.getValue());
//                role4.setCode(EduConstants.Role.ROLESTUDENT_TT.getKey());
//                role4.setRole(EduConstants.Role.ROLESTUDENT_TT.getValue());
//                roleSet.add(role1);
//                roleSet.add(role2);
//                roleSet.add(role3);
//                roleSet.add(role4);
//                roleList = roleRepository.saveAll(roleSet);
//            }
//            if (!accountRepository.existsByUserName("admin")) {
//                createDefaultUser("ADMIN","ADMIN",1);
//                createDefaultUser("GV01","GV01",2);
//                createDefaultUser("SV000","SV000",3);
//                createDefaultUser("SV001","SV001",4);
//                createDefaultUser("SV002","SV002",5);
//            }
//            System.out.println("Danh sach tai khoan mac dinh:");
//            System.out.println("Tai khoan co quyen admin: ADMIN-ADMIN");
//            System.out.println("Tai khoan co quyen Giang vien: GV01-GV01");
//            System.out.println("Tai khoan co quyen Sinh vien lam do an: SV000-SV000");
//            System.out.println("Tai khoan co quyen Sinh vien thuc tap: SV001-SV001");
//            System.out.println("Tai khoan co quyen Sinh vien lam ca TT va DA: SV002-SV002");
//            System.out.println("**********************************************************");
//        };
//    }

    private void createDefaultUser(String username, String pass, int type) {
        Account account = new Account();
        account.setPassword(pass);
        account.setUsername(username);
        try {
           account = accountRepository.save(account);
        } catch (Exception e) {
            System.out.println("Main:" + e.getMessage());
        }
        String acctype = "";
        if (type == 1) {
            acctype = "Admin";
            Role role = roleRepository.findByCode(EduConstants.Role.ROLEADMIN.getKey()).orElse(null);
            if (account.getRoles() == null || account.getRoles().size() == 0) {
                account.setRoles(new HashSet<>());
                account.getRoles().add(role);
            }
            else{
                account.getRoles().clear();
                account.getRoles().add(role);
            }
            User user = new User();
            user.setFullName(username);
            user.setAccount(account);
            account.setUser(user);
            user.setUserType(type<=3?type:3);
            userRepository.save(user);
        } else if (type == 2) {
            acctype = "GV";
            Role role = roleRepository.findByCode(EduConstants.Role.ROLELECTURERS.getKey()).orElse(null);
            if (account.getRoles() == null) {
                account.setRoles(new HashSet<>());
                account.getRoles().add(role);
            }
            else{
                account.getRoles().clear();
                account.getRoles().add(role);
            }
            Lecturer lecturer = new Lecturer();
            lecturer.setFullName(username);
            lecturer.setAccount(account);
            account.setUser(lecturer);
            lecturer.setUserType(type<=3?type:3);
            lecturerRepository.save(lecturer);
        } else if (type == 3) {
            acctype = "SV-DA";
            Role role = roleRepository.findByCode(EduConstants.Role.ROLESTUDENT_DA.getKey()).orElse(null);
            if (account.getRoles() == null) {
                account.setRoles(new HashSet<>());
                account.getRoles().add(role);
            }
            else{
                account.getRoles().clear();
                account.getRoles().add(role);
            }
            Grade grade = gradeRepository.findByName("62PM2").orElse(null);
            if(grade == null){
                grade = new Grade();
                grade.setName("62PM2");
                grade = gradeRepository.save(grade);
            }
            Student student = new Student();
            student.setFullName(username);
            student.setAccount(account);
            account.setUser(student);
            student.setUserType(type<=3?type:3);
            student.setStudentCode(username);
            student.setGrade(grade);
            studentRepository.save(student);
        }
        else if(type == 4){
            acctype = "SV-TT";
            Role role = roleRepository.findByCode(EduConstants.Role.ROLESTUDENT_TT.getKey()).orElse(null);
            if (account.getRoles() == null) {
                account.setRoles(new HashSet<>());
                account.getRoles().add(role);
            }
            else{
                account.getRoles().clear();
                account.getRoles().add(role);
            }
            Grade grade = gradeRepository.findByName("62PM2").orElse(null);
            if(grade == null){
                grade = new Grade();
                grade.setName("62PM2");
            }
            Student student = new Student();
            student.setFullName(username);
            student.setAccount(account);
            account.setUser(student);
            student.setUserType(type<=3?type:3);
            student.setStudentCode(username);
            student.setGrade(grade);
            studentRepository.save(student);
        }
        else if(type == 5){
            acctype = "SV-DA-TT";
            Role role = roleRepository.findByCode(EduConstants.Role.ROLESTUDENT_TT.getKey()).orElse(null);
            Role role1 = roleRepository.findByCode(EduConstants.Role.ROLESTUDENT_DA.getKey()).orElse(null);
            if (account.getRoles() == null) {
                account.setRoles(new HashSet<>());
                account.getRoles().add(role);
                account.getRoles().add(role1);
            }
            else{
                account.getRoles().clear();
                account.getRoles().add(role);
                account.getRoles().add(role1);
            }
            Grade grade = gradeRepository.findByName("62PM2").orElse(null);
            if(grade == null){
                grade = new Grade();
                grade.setName("62PM2");
            }
            Student student = new Student();
            student.setFullName(username);
            student.setAccount(account);
            account.setUser(student);
            student.setUserType(type<=3?type:3);
            student.setStudentCode(username);
            student.setGrade(grade);
            studentRepository.save(student);
        }
        accountRepository.save(account);
        System.out.println("Da tao tai khoan "+acctype+":"+username+"-"+pass);
    }

    @Override
    public void run(String... args) throws Exception {
        Role role = roleRepository.findByRole(EduConstants.Role.ROLEADMIN.getValue());
        Set<Role> roleSet = new HashSet<>();
        List<Role> roleList = null;
        if (role == null) {
            Role role1 = new Role();
            Role role2 = new Role();
            Role role3 = new Role();
            Role role4 = new Role();
            role1.setCode(EduConstants.Role.ROLEADMIN.getKey());
            role1.setRole(EduConstants.Role.ROLEADMIN.getValue());
            role2.setCode(EduConstants.Role.ROLELECTURERS.getKey());
            role2.setRole(EduConstants.Role.ROLELECTURERS.getValue());
            role3.setCode(EduConstants.Role.ROLESTUDENT_DA.getKey());
            role3.setRole(EduConstants.Role.ROLESTUDENT_DA.getValue());
            role4.setCode(EduConstants.Role.ROLESTUDENT_TT.getKey());
            role4.setRole(EduConstants.Role.ROLESTUDENT_TT.getValue());
            roleSet.add(role1);
            roleSet.add(role2);
            roleSet.add(role3);
            roleSet.add(role4);
            roleList = roleRepository.saveAll(roleSet);
        }
        if (!accountRepository.existsByUserName("admin")) {
            createDefaultUser("ADMIN","ADMIN",1);
            createDefaultUser("GV01","GV01",2);
            createDefaultUser("SV000","SV000",3);
            createDefaultUser("SV001","SV001",4);
            createDefaultUser("SV002","SV002",5);
        }
        System.out.println("Danh sach tai khoan mac dinh:");
        System.out.println("Tai khoan co quyen admin: ADMIN-ADMIN");
        System.out.println("Tai khoan co quyen Giang vien: GV01-GV01");
        System.out.println("Tai khoan co quyen Sinh vien lam do an: SV000-SV000");
        System.out.println("Tai khoan co quyen Sinh vien thuc tap: SV001-SV001");
        System.out.println("Tai khoan co quyen Sinh vien lam ca TT va DA: SV002-SV002");
        System.out.println("**********************************************************");
    }
}
