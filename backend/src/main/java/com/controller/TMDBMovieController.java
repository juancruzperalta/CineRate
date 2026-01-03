package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.TMDBMovieService;

@RestController
@RequestMapping("/api/movie")
@CrossOrigin(origins = "http://localhost:5173")
public class TMDBMovieController {
      @Autowired
      private TMDBMovieService service;
        @GetMapping("/populars")
      public ResponseEntity<String> getPopularsMovies() {
        ResponseEntity<String> data = service.getPopularsMovies();
        if(data != null){
          return data;
        }
        throw new Error("ERROR: Dind't get details");
      }

      @GetMapping("/details/{id}")
      public ResponseEntity<String> getDetailsMovie(@PathVariable("id") int id) {
        ResponseEntity<String> data = service.getDetailsId(id);
        if(data != null){
          return data;
        }
        throw new Error("ERROR: Dind't get details");
      }

}
