package com.repository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.vote.VoteDTO;
import com.model.vote.VoteEntity;

public interface VoteRepository extends JpaRepository<VoteEntity, Integer> {
  Optional<VoteEntity> findByUser_IdAndMediaId(UUID userId, int mediaId);
  List<VoteEntity> findByUser_Id(UUID id);

}
