package com.model.favorite;

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
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "favorites")
public class FavoriteEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserEntity user;
  @Column(name = "media_id")
  int mediaId;
  @Column(name = "is_serie")
  boolean isSerie;
  LocalDateTime created_at;

  @PrePersist
  public void onCreate() {
    this.created_at = LocalDateTime.now();
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public int getMediaId() {
    return mediaId;
  }

  public void setMediaId(int mediaId) {
    this.mediaId = mediaId;
  }

  public boolean isSerie() {
    return isSerie;
  }

  public void setSerie(boolean isSerie) {
    this.isSerie = isSerie;
  }


  public LocalDateTime getCreated_at() {
    return created_at;
  }

  public void setCreated_at(LocalDateTime created_at) {
    this.created_at = created_at;
  }

  public UserEntity getUser() {
    return user;
  }

  public void setUser(UserEntity user) {
    this.user = user;
  }

  
}
