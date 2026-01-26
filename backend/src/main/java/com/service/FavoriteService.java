package com.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.favorite.FavoriteEntity;
import com.model.user.UserEntity;
import com.repository.FavoriteRepo;
import com.repository.user.UserRepository;

@Service
public class FavoriteService {

    @Autowired
    FavoriteRepo repo;

    @Autowired
    UserRepository repoUser;

    public void addFavorite(int mediaId, boolean mediaType, String email) {
      if (email.isBlank()) {
        throw new IllegalArgumentException("¿Your has been logged?");
      }
      if (mediaId < 0) {
        throw new IllegalArgumentException("Error to add favorite serie or movie");
      }
      UserEntity user = repoUser.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
      Optional<FavoriteEntity> favorit = repo.findByUser_IdAndMediaId(user.getId(), mediaId);

      if (favorit.isPresent()) {
        repo.delete(favorit.get());
        return;
      }
      FavoriteEntity favoritN = new FavoriteEntity();
      favoritN.setMediaId(mediaId);
      favoritN.setUser(user);
      if (mediaType == true) {
        favoritN.setSerie(true);
      }
      favoritN.setCreated_at(LocalDateTime.now());
      repo.save(favoritN);
    }

    public boolean findByUser_IdAndMediaId(UUID userId, int mediaId) {
      Optional<FavoriteEntity> favorit = repo.findByUser_IdAndMediaId(userId, mediaId);
      if(favorit.isPresent()){
        return true;
      }
      return false;
    }
    
}
