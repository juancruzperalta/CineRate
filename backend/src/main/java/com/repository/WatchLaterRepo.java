package com.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.model.watchLater.WatchLaterEntity;

import jakarta.transaction.Transactional;

public interface WatchLaterRepo extends JpaRepository<WatchLaterEntity, Integer> {

  Optional<WatchLaterEntity> findByUser_IdAndMediaId(UUID id, int mediaId);

   List<WatchLaterEntity> findByUser_IdAndIsSerie(UUID userId, boolean isSerie);

}
