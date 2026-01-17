package com.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.user.UserEntity;
import com.model.vote.VoteDTO;
import com.model.vote.VoteEntity;
import com.repository.VoteRepository;
import com.repository.user.UserRepository;
@Service
public class VoteService {
  @Autowired
  VoteRepository repo;
  @Autowired
  UserRepository userRepo;
  public void createVote(int media_id, int value, String mediaType, String email) {
      UserEntity user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Optional<VoteEntity> existVote = repo.findByUser_IdAndMediaId(user.getId(), media_id);

    if (existVote.isPresent()) {
      VoteEntity vot = existVote.get();
      vot.setRating(value);
      repo.save(vot);
    } else {
      VoteEntity vote = new VoteEntity();
      vote.setUser(user);
      vote.setMediaId(media_id);
      vote.setMedia_type(mediaType);
      vote.setRating(value);
      repo.save(vote);
    }
  }

  public VoteDTO findById(int mediaId, UUID userId) {
    Optional<VoteEntity> vote = repo.findByUser_IdAndMediaId(userId, mediaId);
    if (vote.isEmpty()) {
      return null;
    }
    if (vote.get().getRating() <= 0) {
      return null;
    }
    if(vote.get().getRating()> 5){
      return null;
    }
    VoteDTO vot = new VoteDTO();
    vot.setUserID(userId);
    vot.setRating(vote.get().getRating());
    vot.setmediaId(mediaId);
    return vot;
  }

  public int findByIdUser(UUID id) {
    List<VoteEntity> vote = repo.findByUser_Id(id);
    return vote.size();
  }
}
