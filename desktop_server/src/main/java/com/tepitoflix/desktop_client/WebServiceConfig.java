/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tepitoflix.desktop_client;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.ws.config.annotation.EnableWs;
import org.springframework.ws.config.annotation.WsConfigurerAdapter;
import org.springframework.ws.transport.http.MessageDispatcherServlet;
import org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition;
import org.springframework.xml.xsd.SimpleXsdSchema;
import org.springframework.xml.xsd.XsdSchema;

/**
 *
 * @author arturo
 */
@EnableWs
@Configuration
public class WebServiceConfig extends WsConfigurerAdapter {
    // bean definitions
    @Bean
    public ServletRegistrationBean messageDispatcherServlet(ApplicationContext applicationContext) {
        MessageDispatcherServlet servlet = new MessageDispatcherServlet();
        servlet.setApplicationContext(applicationContext);
        servlet.setTransformWsdlLocations(true);
        return new ServletRegistrationBean(servlet, "/ws/*");
    }
    
    @Bean(name = "movies")
    public DefaultWsdl11Definition defaultWsdl11Definition(XsdSchema moviesSchema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName("MoviesPort");
        wsdl11Definition.setLocationUri("/ws");
        wsdl11Definition.setTargetNamespace("http://tepitoflix.com/desktop_client/gen");
        wsdl11Definition.setSchema(moviesSchema);
        return wsdl11Definition;
    }

    @Bean
    public XsdSchema moviesSchema() {
        return new SimpleXsdSchema(new ClassPathResource("MovieSchema.xsd"));
    }
}

// @Configuration
// @EnableWebMvc
// public class WebConfig extends WebMvcConfigurerAdapter {

//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**")
//                 .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
//     }
// }
@Configuration
@EnableWebMvc
class WebConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*");
        System.out.println("cors added: "+registry);
    }
}