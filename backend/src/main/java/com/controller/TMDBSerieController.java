package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.TMDBSerieService;


@RestController
@RequestMapping("/api/serie")
public class TMDBSerieController{

      @Autowired
      private TMDBSerieService service;

      @GetMapping("/populars")
      public ResponseEntity<String> getPopularSeries() {
        ResponseEntity<String> data = service.getPopularSeries();
                if(data != null){
          return ResponseEntity.ok()
          .contentType(MediaType.APPLICATION_JSON)
          .body(data.getBody());
        }
        throw new Error("ERROR: Dind't get populars serie");
      }

      @GetMapping("/trailer/{id}")
      public ResponseEntity<String> getTrailerSerie(@PathVariable("id") int id) {
        ResponseEntity<String> data = service.getTrailerId(id);
        if(data != null){
          return ResponseEntity.ok()
          .contentType(MediaType.APPLICATION_JSON)
          .body(data.getBody());
        }
        throw new Error("ERROR: Dind't get trailer serie");
      }

      @GetMapping("/details/{id}")
      public ResponseEntity<String> getDetailsSerie(@PathVariable("id") int id) {
        ResponseEntity<String> data = service.getDetailsId(id);
        if(data != null){
          return data;
        }
        throw new Error("ERROR: Dind't get details");
      }
          @GetMapping("/details/{id}/credits")
      public ResponseEntity<String> getCreditsSerie(@PathVariable("id") int id) {
        ResponseEntity<String> data = service.getCreditsSerie(id);
        if(data != null){
          return data;
        }
        throw new Error("ERROR: Dind't get credits");
      }

      @GetMapping("/airing-today")
      public ResponseEntity<String> getAiringTodaySerie(){
        ResponseEntity<String> data = service.getAiringTodaySerie();
       if(data != null){
          return ResponseEntity.ok()
          .contentType(MediaType.APPLICATION_JSON)
          .body(data.getBody());
        }
        throw new Error("ERROR: Dind't get airing today");
      }

       @GetMapping("/recommended-series/{id}")
       public ResponseEntity<String> getRecommendedSeries(@PathVariable("id") int id) {
         ResponseEntity<String> data = service.getRecommendedSeries(id);
         if (data != null) {
           return ResponseEntity.ok()
               .contentType(MediaType.APPLICATION_JSON)
               .body(data.getBody());
         }
         throw new Error("ERROR: Dind't get recommended series");
       }
      @GetMapping("/premiere-series")
      public ResponseEntity<String> getPremiereSe() {
        ResponseEntity<String> data = service.getPremiereSeries();
                if(data != null){
          return ResponseEntity.ok()
          .contentType(MediaType.APPLICATION_JSON)
          .body(data.getBody());
        }
        throw new Error("ERROR: Dind't get premiere series");
      }
   @GetMapping("/top-ten")
      public ResponseEntity<String> getTopTenSeries() {
        ResponseEntity<String> data = service.getTopTen();
                if(data != null){
          return ResponseEntity.ok()
          .contentType(MediaType.APPLICATION_JSON)
          .body(data.getBody());
        }
        throw new Error("ERROR: Dind't get top ten series");
      }
    @GetMapping("/similar/{id}")
    public ResponseEntity<String> getSeimilarSeries(@PathVariable("id") int id) {
         ResponseEntity<String> data = service.getSimilarSerie(id);
                if(data != null){
          return ResponseEntity.ok()
          .contentType(MediaType.APPLICATION_JSON)
          .body(data.getBody());
        }
        throw new Error("ERROR: Dind't get similar serie");
      }

      @GetMapping("/search/{query}")
    public ResponseEntity<String> getSearchMoviesAndSeries(@PathVariable("query") String query) {
         ResponseEntity<String> data = service.getSearchMoviesAndSeries(query);
                if(data != null){
          return ResponseEntity.ok()
          .contentType(MediaType.APPLICATION_JSON)
          .body(data.getBody());
        }
        throw new Error("ERROR: Dind't get movie or serie");
      }
}