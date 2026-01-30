package com;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Value("${FRONTEND_URL}")
    private String frontendUrl;
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOrigins(List.of(
        "https://cine-rate.site"
    ));

    config.setAllowedMethods(List.of(
        "GET","POST","PUT","DELETE","OPTIONS"
    ));

    config.setAllowedHeaders(List.of("*"));
    config.setExposedHeaders(List.of("*"));

    config.setAllowCredentials(true); // importante

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
    }
}