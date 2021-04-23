/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tepitoflix.desktop_client;
import com.tepitoflix.desktop_client.gen.GetMovieRequest;
import com.tepitoflix.desktop_client.gen.GetMovieResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

/**
 *
 * @author arturo
 */
@Endpoint
public class MovieEndpoint {
    private static final String NAMESPACE_URI = "http://tepitoflix.com/desktop_client/gen";

    private MovieRepository movieRepository;

    @Autowired
    public  MovieEndpoint(MovieRepository movieRepository){
        this.movieRepository = movieRepository;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getMovieRequest")
    @ResponsePayload
    public GetMovieResponse getMovie(@RequestPayload GetMovieRequest request) {
        GetMovieResponse response = new GetMovieResponse();
        response.setMovie(movieRepository.findMovie(request.getId()));
        System.out.println("Respuesta id "+ request.getId());
        return response;
    }
}