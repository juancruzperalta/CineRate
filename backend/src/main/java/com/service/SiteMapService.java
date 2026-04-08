package com.service;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class SiteMapService {
        private String sitemapCache;
        private final TMDBMovieService movieService;
        private final TMDBSerieService serieService;

        public String getSitemap() {
            return sitemapCache;
        }
// Si no lo inicializo, lo rompe.
    public SiteMapService(TMDBMovieService movieService, TMDBSerieService serieService) {
        this.movieService = movieService;
        this.serieService = serieService;
    }
         @PostConstruct
        public void init() {
            generateSitemap();
        }
    @Scheduled(fixedRate = 86400000) // Actualiza cada 24 horas
    public void generateSitemap() {
        List<Integer> movieIds = movieService.getPopularMovieIds();
        List<Integer> seriesIds = serieService.getPopularSeriesIds();

        StringBuilder xml = new StringBuilder();

        xml.append("""
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        """);

        xml.append("<url><loc>https://cine-rate.site/</loc></url>");
        if(!movieIds.isEmpty()){
            for(Integer id : movieIds){
                xml.append("<url><loc>https://cine-rate.site/movie/")
                .append(id)
                .append("</loc></url>");
            }
        }

        if(!seriesIds.isEmpty()){
            for(Integer id : seriesIds){
                xml.append("<url><loc>https://cine-rate.site/series/")
                .append(id)
                .append("</loc></url>");
            }
        }

        xml.append("</urlset>");

        sitemapCache= xml.toString();
    }
}
