package com.biblioteca.SGB.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer corsConfigurer(){

        return new WebMvcConfigurer(){

            @Override
            public void addCorsMappings(CorsRegistry registry){

                registry.addMapping("/**") // Permite todos os endpoints
                        .allowedOrigins("http://localhost:5173") // Permite requisições do React
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos HTTP permitidos
                        .allowedHeaders("*") // Permite todos os cabeçalhos
                        .allowCredentials(true); // Permite envio de cookies (opcional)

            }
        };
    }
}
