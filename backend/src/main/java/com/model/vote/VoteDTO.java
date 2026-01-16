package com.model.vote;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;

public class VoteDTO {
  int id;
  UUID UserID;
  
    @Column(name = "media_id")
  int mediaId;
  int rating;
  LocalDateTime created_at;
  public int getId() {
    return id;
  }
  public UUID getUserID() {
    return UserID;
  }
  public int getmediaId() {
    return mediaId;
  }
  public int getRating() {
    return rating;
  }
  public LocalDateTime getCreated_at() {
    return created_at;
  }
  public void setId(int id) {
    this.id = id;
  }
  public void setUserID(UUID userID) {
    UserID = userID;
  }
  public void setmediaId(int mediaId) {
    this.mediaId = mediaId;
  }
  public void setRating(int rating) {
    this.rating = rating;
  }
  public void setCreated_at(LocalDateTime created_at) {
    this.created_at = created_at;
  }

  
}
