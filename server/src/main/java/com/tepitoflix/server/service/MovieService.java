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
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.tepitoflix.server.data.MovieRepository;
import com.tepitoflix.server.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MovieService implements GraphQLQueryResolver {
    @Autowired 
    private MovieRepository movieRepository;
    
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
}
