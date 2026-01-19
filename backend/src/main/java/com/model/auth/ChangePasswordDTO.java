package com.model.auth;

public class ChangePasswordDTO {
  String email;
  String passwordAct;
  String newPassword;
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getPasswordAct() {
    return passwordAct;
  }
  public void setPasswordAct(String passwordAct) {
    this.passwordAct = passwordAct;
  }
  public String getNewPassword() {
    return newPassword;
  }
  public void setNewPassword(String newPassword) {
    this.newPassword = newPassword;
  }
  
}