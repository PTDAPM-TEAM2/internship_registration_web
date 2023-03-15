package com.group4.edu.until;

import com.group4.edu.EduConstants;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.concurrent.TransferQueue;

public class SemesterDateTimeUntil {
    public static final String monthFirstSemester = " 9 10 11 12 ";
    public static final String monthSecondSemester = " 1 2 3 4 ";
    public static final String monthThirdSemester = " 5 6 7 8 ";
    public static String getCurrentSemesterCode(){
//        LocalDateTime now = LocalDateTime.now();
//        int month = now.getMonthValue();
//        int year = now.getYear();
//        if(month>=startMonthFirstSemester && month<=endMonthFirstSemester)
        Date now = new Date();
        return getSemesterCodeByDate(now);
    }
    public static String getSemesterCodeByDate(Date date){
        LocalDate localDate = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        String monthStr = " "+String.valueOf(localDate.getMonthValue())+" ";
        int semester = monthFirstSemester.contains(monthStr)?1:monthSecondSemester.contains(monthStr)?2:3;
        int firstYear = semester>1? localDate.getYear()-1:localDate.getYear();
        int secondYear = firstYear+1;
        return toStringSemester(semester,firstYear,secondYear);
    }
    private static String  toStringSemester(int semester, int firstYear, int secondYear){
        return "0"+String.valueOf(semester)+"/"+String.valueOf(firstYear)+"-"+String.valueOf(secondYear);
    }

    public static String getSemesterCodeBefore(String semester){
        if(semester != null && !semester.isBlank()){
            String []s = semester.split("/");
            if(s.length == 2){
                String []w = s[1].split("-");
                if(w.length == 2){
                    int s1;
                    int s2;
                    int s3;
                    try {
                        s1 = Integer.parseInt(s[0]);
                        s2 = Integer.parseInt(w[0]);
                        s3 = Integer.parseInt(w[1]);
                    }
                    catch (Exception e){
                        return null;
                    }
                    s1 = s1!=1? s1-1:3;
                    s2 = s1==3?s2-1:s2;
                    s3 = s2+1;
                    return toStringSemester(s1,s2,s3);
                }
            }
        }
        return null;
    }
    public static String getCodeSemesterDefault(){
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        Date date = null;
        try {
            date = formatter.parse(EduConstants.dateInString);
        } catch (ParseException e) {
            System.out.println(e.getMessage());;
        }
        return SemesterDateTimeUntil.getSemesterCodeByDate(date);
    }
}
