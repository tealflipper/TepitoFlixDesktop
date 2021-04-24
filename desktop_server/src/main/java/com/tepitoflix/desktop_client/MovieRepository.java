/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tepitoflix.desktop_client;

import com.tepitoflix.desktop_client.gen.Movie;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
        
        myMovie2.setId(2);
        myMovie2.setTitle("IDK");
        myMovie2.setDirector("idk1");
        myMovie2.setGenre("idk2");
        myMovie2.setRelease(1994);
        myMovie2.setRuntime(85);
        myMovie2.setPrice(9.99);
        movies.put(myMovie2.getId(), myMovie2);
        
        Movie myMovie3 = new Movie();
        
        myMovie3.setId(3);
        myMovie3.setTitle("IDK");
        myMovie3.setDirector("idk1");
        myMovie3.setGenre("idk2");
        myMovie3.setRelease(1994);
        myMovie3.setRuntime(85);
        myMovie3.setPrice(9.99);
        movies.put(myMovie3.getId(), myMovie3);

        System.out.println("movies added");
    }

    //get movies by id
    public Movie findMovie(Integer id) throws SQLException  {
        Movie movie = null;
        try (Connection conn = DriverManager.getConnection("jdbc:mariadb://localhost:3306/TepitoFlix", "admin", "Password123")) {
                // create a Statement
                try (Statement stmt = conn.createStatement()) {
                    //execute query
                    try (ResultSet rs = stmt.executeQuery("SELECT * from movies WHERE movies.id ="+id)) {
                        //position result to first
                        rs.first();
                        movie = new Movie();
                        System.out.println("SQL result");
                        movie.setId(rs.getInt(1));
                        movie.setTitle(rs.getString(2));
                        movie.setDirector(rs.getString(3));
                        movie.setGenre(rs.getString(4));
                        movie.setRelease(rs.getInt(5));
                        movie.setRuntime(rs.getInt(6));
                        movie.setPrice(rs.getDouble(7));
                        System.out.println("\tid: "+rs.getInt(1));
                        System.out.println("\ttitle: "+rs.getString(2));
                        System.out.println("\tdirector: "+rs.getString(3));
                        System.out.println("\tgenre: "+rs.getString(4));
                        System.out.println("\trelease: "+rs.getInt(5));
                        System.out.println("\truntime: "+rs.getInt(6));
                        System.out.println("\tprice: "+rs.getDouble(7));
                        System.out.println("\n\n");
                    }
                }
            }
        
        return movie;
    }
}


