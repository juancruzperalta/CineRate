package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.service.TMDBService;


@RestController
@RequestMapping("/api")
public class TMDBController{

      @Autowired
      private TMDBService service;

      @GetMapping("/populars")
      public ResponseEntity<String> getPopularSeries() {
        return service.getPopularSeries();
      }

      @GetMapping("/trailer/{id}")
      public ResponseEntity<String> getTrailerSerie(@PathVariable int id) {
        ResponseEntity<String> data = service.getTrailerId(id);
        if(data != null){
          return data;
        }
        throw new Error("No trailer");
      }

      @GetMapping("/details/{id}")
      public ResponseEntity<String> getDetailsSerie(@PathVariable int id) {
        ResponseEntity<String> data = service.getDetailsId(id);
        if(data != null){
          return data;
        }
        throw new Error("No trailer");
      }

// export async function getAiringTodaySerie() { //series of tv that today is a new episodio
// export async function getRecommendationsSerie(serieId) {
// //Top ten series of popular...
// export async function topTenSeries() {
// export async function getPremiereSer() {
}