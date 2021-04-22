/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tepitoflix.desktop_client;

import com.tepitoflix.desktop_client.gen.Movie;
import java.util.HashMap;
import org.springframework.stereotype.Component;
import java.util.Map;
import javax.annotation.PostConstruct;

/**
 *
 * @author arturo
 */
@Component
public class MovieRepository {
    private static final Map<Integer, Movie> movies = new HashMap<>();
    
    @PostConstruct
    public void initData(){
        //initialize movies map
        int a = 0;
        Movie myMovie = new Movie();
        
        myMovie.setId(1);
        myMovie.setTitle("IDK");
        myMovie.setDirector("idk1");
        myMovie.setGenre("idk2");
        myMovie.setRelease(1994);
        myMovie.setRuntime(85);
        myMovie.setPrice(9.99);
        movies.put(myMovie.getId(), myMovie);
        
        Movie myMovie2 = new Movie();
        
        myMovie.setId(2);
        myMovie.setTitle("IDK");
        myMovie.setDirector("idk1");
        myMovie.setGenre("idk2");
        myMovie.setRelease(1994);
        myMovie.setRuntime(85);
        myMovie.setPrice(9.99);
        movies.put(myMovie2.getId(), myMovie2);
        
        Movie myMovie3 = new Movie();
        
        myMovie.setId(3);
        myMovie.setTitle("IDK");
        myMovie.setDirector("idk1");
        myMovie.setGenre("idk2");
        myMovie.setRelease(1994);
        myMovie.setRuntime(85);
        myMovie.setPrice(9.99);
        movies.put(myMovie3.getId(), myMovie3);
    }

    //get movies by id
    public Movie findMovie(Integer id) {
        return movies.get(id);
    }
}


