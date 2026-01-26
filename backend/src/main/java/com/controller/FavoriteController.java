package com.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.favorite.FavoriteEntity;
import com.model.user.UserEntity;
import com.service.FavoriteService;

@RestController
@RequestMapping("/api/favorite")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoriteController {
  @Autowired
  FavoriteService service;

  @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Boolean> getFavoritesMovSer(@PathVariable("id") int media_id, @AuthenticationPrincipal UserEntity user) {
      Boolean favs = service.findByUser_IdAndMediaId(user.getId(), media_id);
        return ResponseEntity.ok(favs);
    }

  @PostMapping("/{id}/{mediaType}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> addFavoriteMovSer(@PathVariable("id") int media_id,@PathVariable("mediaType") boolean mediaType, @AuthenticationPrincipal UserEntity user) {
      service.addFavorite(media_id, mediaType, user.getEmail());
      return ResponseEntity.ok().build();
    }
}
