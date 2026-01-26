package com.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.favorite.FavoriteEntity;
import com.model.user.UserEntity;
import com.model.watchLater.WatchLaterEntity;
import com.repository.WatchLaterRepo;
import com.repository.user.UserRepository;

@Service
public class WatchLaterService {

  @Autowired
  UserRepository repoUser;

  @Autowired
  WatchLaterRepo repo;

  public void createWatchLater(int mediaId, boolean mediaType, String email) {
    if (email.isBlank()) {
      throw new IllegalArgumentException("¿Your has been logged?");
    }
   if (mediaId < 0) {
        throw new IllegalArgumentException("Error to add watch later serie or movie");
      }
    UserEntity user = repoUser.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

    Optional<WatchLaterEntity> watchL =  repo.findByUser_IdAndMediaId(user.getId(), mediaId);
    if (watchL.isPresent()) {
      repo.delete(watchL.get());
      return;
    }

    WatchLaterEntity watchNew = new WatchLaterEntity();
    watchNew.setMediaId(mediaId);
    watchNew.setUser(user);
    watchNew.setSerie(mediaType);
    repo.save(watchNew);

  }
     public boolean findByUser_IdAndMediaId(UUID userId, int mediaId) {
      Optional<WatchLaterEntity> favorit = repo.findByUser_IdAndMediaId(userId, mediaId);
      if(favorit.isPresent()){
        return true;
      }
      return false;
    }
     public List<WatchLaterEntity> getWatchLaterAll(UUID userId, boolean value) {
       List<WatchLaterEntity> moviesOrSer = repo.findByUser_IdAndIsSerie(userId, value);
       return moviesOrSer;
     }
}
