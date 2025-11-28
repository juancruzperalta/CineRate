package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TMDBService {
  @Autowired
  private CallApiService serviceCall;
    // @Autowired
    // private repository repos;

    public ResponseEntity<String> getPopularSeries() {
      String url = "https://api.themoviedb.org/3/tv/popular";

      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);

      if (response != null) {
        return response;
      }
        throw new UnsupportedOperationException("Unimplemented method 'getPopularSeries'");
      }

      public ResponseEntity<String> getTrailerId(int id) {
        String url = "https://api.themoviedb.org/3/tv/" + id + "/videos?language=es-ES";
      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);

      if(response != null){
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getTrailerId'");
    }

    public ResponseEntity<String> getDetailsId(int id) {
      String url = "https://api.themoviedb.org/3/tv/" + id + "?language=en-US";
      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);

      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getDetailsId'");
    }
    public ResponseEntity<String> getAiringTodaySerie() {
      String url = "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1";
                  ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);

      if (response != null) {
        return response;
      }
         throw new UnsupportedOperationException("Unimplemented method 'getAiringTodaySerie'");
          }
}
