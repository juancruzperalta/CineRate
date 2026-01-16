package com.model.vote;

import java.time.LocalDateTime;
import java.util.UUID;

import com.model.user.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name ="votes")
public class VoteEntity {
    @Id
    @GeneratedValue(strategy  = GenerationType.IDENTITY)
    int id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
    @Column(name = "media_id")
    int mediaId;
    String media_type;
    int rating;
    LocalDateTime created_at;
    public int getId() {
      return id;
    }
    public UserEntity getUser() {
      return user;
    }
    public void setUser(UserEntity user) {
      this.user = user;
    }
    public int getMediaId() {
      return mediaId;
    }
    public String getMedia_type() {
      return media_type;
    }
    public int getRating() {
      return rating;
    }
    public LocalDateTime getCreated_at() {
      return created_at;
    }
    public void setMediaId(int mediaId) {
      this.mediaId = mediaId;
    }
    public void setMedia_type(String media_type) {
      this.media_type = media_type;
    }
    public void setRating(int rating) {
      this.rating = rating;
    }
    public void setCreated_at(LocalDateTime created_at) {
      this.created_at = created_at;
    }

    
}
