package com.model.user;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class UserDTO {
  private String email;
  private UUID id;
  private String created_at;
  public String getEmail() {
    return email;
  }
  public UUID getId() {
    return id;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public void setId(UUID id) {
    this.id = id;
  }
  public String getCreated_at() {
    return created_at;
  }
  public void setCreated_at(LocalDateTime created_at) {
    this.created_at = created_at.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
  }

}
