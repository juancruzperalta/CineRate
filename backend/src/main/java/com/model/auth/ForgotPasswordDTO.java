package com.model.auth;

public class ForgotPasswordDTO {
  String tokenTemp;
  String password;
  String confirmPassword;
  
  public String getTokenTemp() {
    return tokenTemp;
  }
  public void setTokenTemp(String tokenTemp) {
    this.tokenTemp = tokenTemp;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public String getConfirmPassword() {
    return confirmPassword;
  }
  public void setConfirmPassword(String confirmPassword) {
    this.confirmPassword = confirmPassword;
  }

  
}
