package com.service.auth;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.model.user.UserEntity;
import com.repository.user.UserRepository;

@Service
public class EmailService {
  private final UserRepository repo;
  private final JavaMailSender mailSender;
    @Value("${FRONTEND_URL}")
    private String frontendUrl;
  public EmailService(JavaMailSender mailSender, UserRepository repo){
    this.mailSender = mailSender;
    this.repo = repo;
  }

  public void sendResetPassword(String email, String token) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(email);
    message.setSubject("CineRate | Change Password");
    message.setText(
      "Going to change password:\n" +
      frontendUrl+"/user/reset-forgot-password?token="+ token
    );
    mailSender.send(message);
  }

  public boolean forgotPass(String email, String tokenTemp) {
    if (tokenTemp == null || tokenTemp.isBlank()) {
      throw new IllegalArgumentException("Invalid token");
    }
    if (repo.findByEmail(email).isEmpty()) {
      throw new IllegalArgumentException("Email is not registred");
    }
    this.sendResetPassword(email, tokenTemp);
    UserEntity us = repo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    us.setTokenTemp(tokenTemp);
    repo.save(us);
    return true;
		}
  public boolean registerSendEmail(String email, String tokenTemp) {
    if (tokenTemp == null || tokenTemp.isBlank()) {
      throw new IllegalArgumentException("Invalid token");
    }
    if (email.isBlank()) {
            throw new IllegalArgumentException("Email null");
    }
    if (repo.existsByEmail(email) || repo.findBytokenTemp(tokenTemp).isPresent()) {
      throw new IllegalArgumentException("You already registred");
    }
    
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(email);
    message.setFrom("juanpera3000@gmail.com");

    message.setSubject("CineRate | Register Account");
    message.setText(
      "To register account click here:\n" +
      frontendUrl+"/auth/register/confirm?token=" + tokenTemp
    );
    mailSender.send(message);
    UserEntity nuevoUser = new UserEntity();
    nuevoUser.setTokenTemp(tokenTemp);
    nuevoUser.setEmail(email);
    nuevoUser.setcreatedAt(LocalDateTime.now());
    repo.save(nuevoUser);
    return true;
  }
}