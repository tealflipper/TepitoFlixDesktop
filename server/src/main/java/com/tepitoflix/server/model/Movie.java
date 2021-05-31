/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tepitoflix.server.model;

import javax.persistence.Entity;
import javax.persistence.*;
import lombok.*;

/**
 *
 * @author arturo
 */

@Setter
@NoArgsConstructor
@Entity
@Table(name= "movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id" )
    protected Integer id;
    @Column(name = "title" )
    protected String title;
    @Column(name = "director" )
    protected String director;
    @Column(name = "genre" )
    protected String genre;
    @Column(name = "release_year" )
    protected Integer release;
    @Column(name = "runtime" )
    protected Integer runtime;
    @Column(name = "price" )
    protected Double price;

    public Movie(String title, String director, String genre, Integer release, Integer runtime, Double price) {
        this.title = title;
        this.director = director;
        this.genre = genre;
        this.release = release;
        this.runtime = runtime;
        this.price = price;
    }
    
    
    
}
