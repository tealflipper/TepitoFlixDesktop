/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tepitoflix.server.data;

import javax.persistence.EntityManager;

import com.tepitoflix.server.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author arturo
 */
@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
  @Transactional
  @Modifying
  @Query(value = "UPDATE movie SET title = ?2, director = ?3, genre = ?4, release_year = ?5, runtime = ?6, price =?7 WHERE id = ?1 ", nativeQuery = true)
  int updateMovie(Integer id, String title, String director, String genre, Integer release_year, Integer runtime, Double price);
}
