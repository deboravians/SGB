package com.biblioteca.SGB.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateUtils {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static String formatarData(LocalDate data) {
        return (data != null) ? data.format(FORMATTER) : null;
    }

    public static LocalDate formatarData(String dataStr) {

        try{
            return (dataStr != null && !dataStr.isEmpty()) ? LocalDate.parse(dataStr, FORMATTER) : null;

        }catch (DateTimeParseException e){
            System.err.println("Erro ao converter a data: " + dataStr);
            return null;
        }
    }
}