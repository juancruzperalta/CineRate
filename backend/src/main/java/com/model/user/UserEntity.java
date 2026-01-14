package com.model.user;
import java.sql.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
    private Date created_at;
    

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

    public Date getCreated_at() {
      return created_at;
    }

    public void setCreated_at(Date created_at) {
      this.created_at = created_at;
    }
    
}