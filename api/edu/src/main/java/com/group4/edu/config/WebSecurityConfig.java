package com.group4.edu.config;

import com.group4.edu.EduConstants;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//    @Bean
//    @Override
//    public UserDetailsService userDetailsService() {
////        // Tạo ra user trong bộ nhớ
////        // lưu ý, chỉ sử dụng cách này để minh họa
////        // Còn thực tế chúng ta sẽ kiểm tra user trong csdl
////        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
////        manager.createUser(
////                User.withDefaultPasswordEncoder() // Sử dụng mã hóa password đơn giản
////                        .username("loda")
////                        .password("loda")
////                        .roles("USER") // phân quyền là người dùng.
////                        .build()
////        );
////        return manager;
////    }
////
////    @Override
////    protected void configure(HttpSecurity http) throws Exception {
////        http
////                .authorizeRequests()
////                .antMatchers("/", "/home").permitAll() // Cho phép tất cả mọi người truy cập vào 2 địa chỉ này
////                .anyRequest().authenticated() // Tất cả các request khác đều cần phải xác thực mới được truy cập
////                .and()
////                .formLogin() // Cho phép người dùng xác thực bằng form login
////                .defaultSuccessUrl("/hello")
////                .permitAll() // Tất cả đều được truy cập vào địa chỉ này
////                .and()
////                .logout() // Cho phép logout
////                .permitAll();
////    }

    @Bean
    public JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter() throws Exception {
        JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter = new JwtAuthenticationTokenFilter();
        jwtAuthenticationTokenFilter.setAuthenticationManager(authenticationManager());
        return jwtAuthenticationTokenFilter;
    }
//    @Bean
//    public RestAuthenticationEntryPoint restServicesEntryPoint() {
//        return new RestAuthenticationEntryPoint();
//    }
    @Bean
    public AccessDeniedHandler customAccessDeniedHandler() {
        return new AccessDeniedHandler() {
            @Override
            public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Access Denied!");
            }
        };
    }
    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
    protected void configure(HttpSecurity http) throws Exception {
        // Disable crsf cho đường dẫn /rest/**
        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("/login-tt").permitAll()
                .antMatchers("/login-da").permitAll()
                .antMatchers("/api/account/**").hasAuthority(EduConstants.Role.ROLEADMIN.getValue())
                .antMatchers("/api/role/**").hasAuthority(EduConstants.Role.ROLEADMIN.getValue())
                .anyRequest().hasAnyAuthority(EduConstants.Role.ROLEADMIN.getValue(), EduConstants.Role.ROLELECTURERS.getValue(),EduConstants.Role.ROLESTUDENT_DA.getValue(),EduConstants.Role.ROLESTUDENT_TT.getValue())
                .and()
                .addFilterBefore(jwtAuthenticationTokenFilter(), JwtAuthenticationTokenFilter.class)
                .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());
    }
}
