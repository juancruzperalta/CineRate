package com.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CallApiService {
    @Value("${tmdb.api.key}")
    private String tmdbKey;
  private RestTemplate restTemplate = new RestTemplate();
  public ResponseEntity<String> obtenerDatos() {
    String url = "https://api.themoviedb.org/3/tv/";

    HttpHeaders headers = new HttpHeaders();
    headers.set("Accept", "application/json");
                HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response =
                restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response;
  }
}
