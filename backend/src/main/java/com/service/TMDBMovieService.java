package com.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class TMDBMovieService {
  @Autowired
  private CallApiService serviceCall;
  public ResponseEntity<String> getPopularsMovies() {
 String url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);
      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getDetailsId'");
  }
  public ResponseEntity<String> getDetailsId(int id) {
    String url = "https://api.themoviedb.org/3/movie/" + id + "?language=en-US";
      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);
      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getDetailsId'");
  }
  public ResponseEntity<String> getCreditsId(int id) {
    String url = "https://api.themoviedb.org/3/movie/" + id + "/credits?language=en-US";
      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);
      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getCreditsId");
  }
  public ResponseEntity<String> getSimilarsId(int id) {
    String url = "https://api.themoviedb.org/3/movie/" + id + "/similar?language=en-US&page=1";
      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);
      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getSimilarsId");
  }
  public ResponseEntity<String> getPremiereId() {
    String url = "https://api.themoviedb.org/3/movie/upcoming";
      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);
      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getPremiereMovie");
  }
  public List<Integer> getPopularMovieIds() {
    java.util.List<Integer> movieIds = new LinkedList<>();
    ResponseEntity<String> response = this.getPopularsMovies();
    if (response != null && response.getStatusCode().is2xxSuccessful()) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());

                JsonNode results = root.get("results");

                for (JsonNode movie : results) {
                    movieIds.add(movie.get("id").asInt());
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
          }
    return movieIds;
  }
}
