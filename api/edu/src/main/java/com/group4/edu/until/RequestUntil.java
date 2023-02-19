package com.group4.edu.until;

import com.group4.edu.EduConstants;

import javax.servlet.http.HttpServletRequest;

public class RequestUntil {
    public static String getTokenByRequest(HttpServletRequest request){
        return request.getHeader(EduConstants.hederAuthorization).replace("Bearer ", "");
    }
}
