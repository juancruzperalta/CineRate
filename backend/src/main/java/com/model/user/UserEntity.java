package com.model.user;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class UserEntity {

     @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true)
    private String email;

    private String password;

    private String role = "USER";
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "token_temp", unique=true)
    private String tokenTemp;
    @Column(name = "is_active", nullable = false)
    private boolean isActive;
    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();;
    }

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }

    public String getPassword() {
      return password;
    }

    public void setPassword(String password) {
      this.password = password;
    }

    public String getRole() {
      return role;
    }

    public void setRole(String role) {
      this.role = role;
    }

    public UUID getId() {
      return id;
    }

    public void setId(UUID id) {
      this.id = id;
    }

    public LocalDateTime getCreatedAt() {
      return createdAt;
    }

    public void setcreatedAt(LocalDateTime createdAt) {
      this.createdAt = createdAt;
    }

    public String getTokenTemp() {
      return tokenTemp;
    }

    public void setTokenTemp(String tokenTemp) {
      this.tokenTemp = tokenTemp;
    }

    public boolean isActive() {
      return isActive;
    }

    public void setIsActive(boolean isActive) {
      this.isActive = isActive;
    }
    
}