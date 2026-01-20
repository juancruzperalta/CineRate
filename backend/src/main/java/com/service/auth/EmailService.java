package com.service.auth;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.model.user.UserEntity;
import com.repository.user.UserRepository;

@Service
public class EmailService {
  private final UserRepository repo;
  private final JavaMailSender mailSender;

  public EmailService(JavaMailSender mailSender, UserRepository repo){
    this.mailSender = mailSender;
    this.repo = repo;
  }
    public void sendResetPassword(String email, String token) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(email);
    message.setSubject("CineRate | Change Password");
    message.setText(
      "Goint to change password:\n" +
      "http://localhost:5173/user/reset-forgot-password?token=" + token
    );
    mailSender.send(message);
  }

  public boolean forgotPass(String email, String tokenTemp) {
    if (tokenTemp == null || tokenTemp.isBlank()) {
    throw new IllegalArgumentException("Token inválido");
}
    this.sendResetPassword(email, tokenTemp);
    UserEntity us = repo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    us.setTokenTemp(tokenTemp);
    repo.save(us);
    return true;
		}
}