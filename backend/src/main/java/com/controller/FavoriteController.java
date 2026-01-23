package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.favorite.FavoriteEntity;
import com.model.user.UserEntity;
import com.service.FavoriteService;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {
  @Autowired
  FavoriteService service;



  @PostMapping("/{id}/{mediaType}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> addFavoriteMovSer(@PathVariable("id") int media_id,@PathVariable("mediaType") boolean mediaType, @AuthenticationPrincipal UserEntity user) {
      // service.createVote(media_id, fav, mediaType, user.getEmail());
      return ResponseEntity.ok().build();
    }
}
