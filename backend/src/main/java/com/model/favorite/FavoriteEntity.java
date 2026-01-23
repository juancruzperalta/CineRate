package com.model.favorite;

import java.time.LocalDateTime;

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
  int rating;
  LocalDateTime created_at;

  @PrePersist
  public void onCreate() {
    this.created_at = LocalDateTime.now();
  }

  
}
