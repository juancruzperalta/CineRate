package com.service.auth;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.model.user.UserEntity;
import com.repository.user.UserRepository;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;

import jakarta.annotation.PostConstruct;
@Service
public class EmailService {
  private final UserRepository repo;
  private final Resend resend;
 public EmailService(@Value("${RESEND_API_KEY}") String apiKey,UserRepository repo) {
        this.repo = repo;
        this.resend = new Resend(apiKey);
    }
  public void sendResetPassword(String email, String token) throws ResendException {
    CreateEmailOptions sendEm = CreateEmailOptions.builder()
       .from("CineRate <onboarding@resend.dev>")
                .to(email)
                .subject("Change password")
                .html("""
                    <h2>CineRate 🎬</h2>
                    <p>click to change password:</p>
                    <a href="https://cine-rate.netlify.app/auth/reset-forgot-password?token=">
                        change password
                    </a>
                """.formatted(token))
                .build();

        resend.emails().send(sendEm);
  }

  public boolean forgotPass(String email, String tokenTemp) throws ResendException {
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
  public boolean registerSendEmail(String email, String tokenTemp) throws ResendException {
    if (tokenTemp == null || tokenTemp.isBlank()) {
      throw new IllegalArgumentException("Invalid token");
    }
    if (email.isBlank()) {
            throw new IllegalArgumentException("Email null");
    }
    if (repo.existsByEmail(email) || repo.findBytokenTemp(tokenTemp).isPresent()) {
      throw new IllegalArgumentException("You already registred");
    }
    CreateEmailOptions sendEm = CreateEmailOptions.builder()
       .from("CineRate <onboarding@resend.dev>")
                .to(email)
                .subject("Confirm your account")
                .html("""
                    <h2>CineRate 🎬</h2>
                    <p>Click for confirm your account:</p>
                    <a href="https://cine-rate.netlify.app/auth/register?token=%s">
                        Confirm account
                    </a>
                """.formatted(tokenTemp))
                .build();

        resend.emails().send(sendEm);
    UserEntity nuevoUser = new UserEntity();
    nuevoUser.setTokenTemp(tokenTemp);
    nuevoUser.setEmail(email);
    nuevoUser.setcreatedAt(LocalDateTime.now());
    repo.save(nuevoUser);
    return true;
  }
}