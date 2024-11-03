package com.example.Backend.AppConfig;

import com.example.Backend.Utils.ToDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public ToDTO toDTO() {
        return new ToDTO();
    }
}
