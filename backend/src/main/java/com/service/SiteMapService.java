package com.service;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class SiteMapService {
        private String sitemapCache;

        public String getSitemap() {
            return sitemapCache;
        }
         @PostConstruct
        public void init() {
            generateSitemap();
        }
    @Scheduled(fixedRate = 86400000) // Actualiza cada 24 horas
    public void generateSitemap() {
        List<Integer> movieIds = TMDBMovieService.getPopularMovieIds();
        List<Integer> seriesIds = TMDBSerieService.getPopularSeriesIds();

        StringBuilder xml = new StringBuilder();

        xml.append("""
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        """);

        xml.append("<url><loc>https://cine-rate.site/</loc></url>");

        for(Integer id : movieIds){
            xml.append("<url><loc>https://cine-rate.site/movie/")
            .append(id)
            .append("</loc></url>");
        }

        for(Integer id : seriesIds){
            xml.append("<url><loc>https://cine-rate.site/series/")
            .append(id)
            .append("</loc></url>");
        }

        xml.append("</urlset>");

        sitemapCache= xml.toString();
    }
}
