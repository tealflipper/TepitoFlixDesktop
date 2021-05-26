package com.tepitoflix.desktop_client;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.sql.*;

@SpringBootApplication
public class DesktopClientApplication {

	public static void main(String[] args) throws SQLException{
            
            
		SpringApplication.run(DesktopClientApplication.class, args);
                
                //create connection for a server installed in localhost, with a user "root" with no password
            
	}

	@Bean
     public CorsFilter corsFilter() {
         final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
         final CorsConfiguration config = new CorsConfiguration();
         config.setAllowCredentials(true);
         config.addAllowedOriginPattern("*"); // this allows all origin
         config.addAllowedHeader("*"); // this allows all headers
         config.addAllowedMethod("OPTIONS");
         config.addAllowedMethod("HEAD");
         config.addAllowedMethod("GET");
         config.addAllowedMethod("PUT");
         config.addAllowedMethod("POST");
         config.addAllowedMethod("DELETE");
         config.addAllowedMethod("PATCH");
         source.registerCorsConfiguration("/**", config);
         return new CorsFilter(source);
     }

}


