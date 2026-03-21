package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import com.service.SiteMapService;


public class SiteMapController {
    @Autowired
    private SiteMapService sitemapService;

    @GetMapping(value = "/sitemap.xml", produces = "application/xml")
    public String SiteMapCall() {
        return sitemapService.getSitemap();
    }
}
