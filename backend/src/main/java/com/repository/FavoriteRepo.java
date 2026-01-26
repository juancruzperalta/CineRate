package com.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.favorite.FavoriteEntity;

public interface FavoriteRepo extends JpaRepository<FavoriteEntity, Integer> {
  Optional<FavoriteEntity> findByUser_IdAndMediaId(UUID userId, int mediaId);
  
}
