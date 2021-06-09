/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tepitoflix.server.service;


import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.coxautodev.graphql.tools.GraphQLSubscriptionResolver;
import com.tepitoflix.server.data.MovieRepository;
import com.tepitoflix.server.model.Movie;

import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

/**
 *
 * @author arturo
 */

@Service
public class MovieService implements GraphQLQueryResolver, GraphQLMutationResolver,GraphQLSubscriptionResolver {
    @Autowired 
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Publisher<List<Movie>> movieSub() {
        return Flux.interval(Duration.ofSeconds(1)).map(movies -> movieRepository.findAll());
        

    }


    public Movie getMovie(Integer id) {
        return movieRepository.findById(id).get();
    }

    public Movie deleteMovie(Integer id){
        Movie movie = movieRepository.findById(id).get();
        movieRepository.deleteById(id);
        return movie;
    }

    public Movie addMovie( String title, String director, String genre,
    Integer release, Integer runtime, Double price) {
        Movie newMovie = new Movie(title,director,genre,release,runtime,price);
        movieRepository.save(newMovie);
        return newMovie;
    }

    public Movie updateMovie(Integer id, String title, String director, String genre, Integer release, Integer runtime, Double price) {
        try {
            movieRepository.updateMovie(id, title, director, genre, release, runtime, price);
            Movie movie = movieRepository.findById(id).get();
            return movie;
        } catch (Exception e){
            throw e;
        }
    }
}
