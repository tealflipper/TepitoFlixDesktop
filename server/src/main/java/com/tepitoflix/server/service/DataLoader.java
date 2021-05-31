/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tepitoflix.server.service;

/**
 *
 * @author arturo
 */

import com.tepitoflix.server.model.Movie;
import com.tepitoflix.server.data.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class DataLoader {
    @Autowired
    private MovieRepository movieRepository;
    
    @PostConstruct
    public void loadData(){
        
        Movie movie1 = new Movie("santa capataz", "john", "terror", 1996, 120, 19.99);
        Movie movie2 = new Movie("buzz estrella", "john", "tsci fi", 1926, 120, 19.99);
        Movie movie3 = new Movie("woody campero", "Dick hard", "thriller", 2020, 120, 19.99);
        
        movieRepository.save(movie1);
        movieRepository.save(movie2);
        movieRepository.save(movie3);

    }
}
