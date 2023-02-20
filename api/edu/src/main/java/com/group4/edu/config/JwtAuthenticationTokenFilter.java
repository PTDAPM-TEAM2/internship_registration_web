package com.group4.edu.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group4.edu.EduConstants;
import com.group4.edu.domain.Account;
import com.group4.edu.service.JwtService;
import com.group4.edu.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.*;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class JwtAuthenticationTokenFilter extends UsernamePasswordAuthenticationFilter {
    private final static String TOKEN_HEADER = "authorization";
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountService accountService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        boolean auth = false;
        String requestString = ((HttpServletRequest) request).getRequestURI();
        System.out.println(requestString);
        System.out.println(EduConstants.RequestNotAuth.LOGIN.getValue());
        System.out.println(requestString.equals(EduConstants.RequestNotAuth.LOGIN.getValue()));
        if(requestString.equals(EduConstants.RequestNotAuth.LOGIN.getValue()) || requestString.equals(EduConstants.RequestNotAuth.CREATEADMIN.getValue())){
            chain.doFilter(request, response);
            return;
        }
        if (httpRequest.getHeader(TOKEN_HEADER) != null) {
            String authToken = httpRequest.getHeader(TOKEN_HEADER).replace("Bearer ", "");
            if (jwtService.validateTokenLogin(authToken)) {
                String username = null;
                try {
                    username = jwtService.getUsernameFromToken(authToken);
                    Account account = accountService.loadUserByUsername(username);
                    if (account != null) {
                        boolean enabled = true;
                        boolean accountNonExpired = true;
                        boolean credentialsNonExpired = true;
                        boolean accountNonLocked = true;
                        UserDetails userDetail = new User(username, account.getPassword(), enabled, accountNonExpired,
                                credentialsNonExpired, accountNonLocked, new HashSet<GrantedAuthority>());
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetail,
                                null, userDetail.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        auth = true;
                    }
                } catch (ParseException e) {

                }
            }
        }
        if(!auth){
                Map<String, ArrayList<String>> responseBody = new HashMap<>();

                responseBody.put("errors", new ArrayList<>(List.of("Failed to authenticate.")));
                httpServletResponse.setStatus(UNAUTHORIZED.value());
                httpServletResponse.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(httpServletResponse.getOutputStream(), responseBody);
                response = httpServletResponse;
        }
        chain.doFilter(request, response);
    }
}
