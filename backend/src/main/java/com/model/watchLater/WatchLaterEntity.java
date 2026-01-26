package com.model.watchLater;

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
@Table(name = "watchlist")
public class WatchLaterEntity {
    @Id
    @GeneratedValue(strategy  = GenerationType.IDENTITY)
    int id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
    @Column(name = "media_id")
    int mediaId;
    @Column(name = "is_serie")
    boolean isSerie;
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
    public void setMediaId(int mediaId) {
      this.mediaId = mediaId;
    }
    public boolean isSerie() {
      return isSerie;
    }
    public void setSerie(boolean isSerie) {
      this.isSerie = isSerie;
    }

    
}
