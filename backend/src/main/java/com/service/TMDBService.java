package com.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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

    public ResponseEntity<String> getRecommendedSeries(int id) {
      String url = "https://api.themoviedb.org/3/tv/" + id + "/recommendations?language=en-US&page=1";
                 ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);

      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getRecommendedSerie'");
          
    }

    public ResponseEntity<String> getPremiereSeries() {
        LocalDate today = LocalDate.now();
        LocalDate nextWeek = today.plusDays(7);
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String startDate = today.format(fmt);
        String endDate = nextWeek.format(fmt);

 String url = "https://api.themoviedb.org/3/discover/tv?language=es-ES&page=1"
        + "&sort_by=first_air_date.asc"
        + "&first_air_date.gte=" + startDate
        + "&first_air_date.lte=" + endDate;
      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);

      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getPremiereSer'");
    }


    public ResponseEntity<String> getTopTen() {
      String url = "https://api.themoviedb.org/3/tv/top_rated?language=es-ES&page=1";
                 ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);

      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getTopTen serie'");
          
    }

    public ResponseEntity<String> getCreditsSerie(int id) {
       String url = "https://api.themoviedb.org/3/tv/" + id + "/credits?language=en-US";
      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);

      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getDetailsId'");
    }
    public ResponseEntity<String> getSimilarSerie(int id) {
   String url = "https://api.themoviedb.org/3/tv/" + id + "/similar?language=en-US&page=1";
      ResponseEntity<String> response = this.serviceCall.getSerieInfo(url);
      if (response != null) {
        return response;
      }
      throw new UnsupportedOperationException("Unimplemented method 'getSimilarSerie'");
    }
}
