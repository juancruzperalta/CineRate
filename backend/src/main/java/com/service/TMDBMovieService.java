package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
    String url = "https://api.themoviedb.org/3/movie/now_playing";
      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);
      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getPremiereMovie");
  }
  
}
