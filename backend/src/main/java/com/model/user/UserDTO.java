package com.model.user;

import java.sql.Date;
import java.util.UUID;

public class UserDTO {
  private String email;
  private UUID id;
  private Date created_at;
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
  public Date getCreated_at() {
    return created_at;
  }
  public void setCreated_at(Date created_at) {
    this.created_at = created_at;
  }

}
