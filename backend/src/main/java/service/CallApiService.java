package service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CallApiService {
    @Value("${tmdb.api.key}")
    private String tmdbKey;
  private RestTemplate restTemplate = new RestTemplate();
  public void obtenerDatos() {
    String url = "https://api.themoviedb.org/3/tv/";

    HttpHeaders headers = new HttpHeaders();
    headers.set()
  }
}
