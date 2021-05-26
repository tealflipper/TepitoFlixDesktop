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


