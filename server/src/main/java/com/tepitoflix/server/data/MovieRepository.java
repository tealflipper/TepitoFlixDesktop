/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tepitoflix.server.data;

import com.tepitoflix.server.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author arturo
 */
@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    
}
