package com.service.auth;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.model.user.UserEntity;
import com.repository.user.UserRepository;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.service.security.RateLimitSecurity;
@Service
public class EmailService {
  private final UserRepository repo;
  private final Resend resend;
  private RateLimitSecurity rateLimit;
 public EmailService(@Value("${RESEND_API_KEY}") String apiKey,UserRepository repo, RateLimitSecurity rateLimit) {
        this.repo = repo;
        this.resend = new Resend(apiKey);
        
              this.rateLimit = rateLimit;
    }
  public void sendResetPassword(String email, String token) throws ResendException {
    CreateEmailOptions sendEm = CreateEmailOptions.builder()
       .from("CineRate <no-reply@cine-rate.site>")
                .to(email)
                .subject("Change password")
                .html("""
                    <h2>CineRate 🎬</h2>
                    <p>click to change password:</p>
                    <a href="https://cine-rate.site/user/reset-forgot-password?token=%s">
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
    if (!rateLimit.existsEmail(email, true)) {
      rateLimit.create(email,true);
    }
    if (!rateLimit.checkForgot(email)) {
            throw new IllegalArgumentException("You should wait a few minutes to forgot renew");
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
    if (repo.existsByEmail(email)) {
      throw new IllegalArgumentException("You already registred");
    }
    if (repo.findBytokenTemp(tokenTemp).isPresent()) {
      throw new IllegalArgumentException("You should wait a few minutes to send another email");
    }
    UserEntity nuevoUser = new UserEntity();
    nuevoUser.setTokenTemp(tokenTemp);
    nuevoUser.setEmail(email);
    nuevoUser.setcreatedAt(LocalDateTime.now());
    repo.save(nuevoUser);
    CreateEmailOptions sendEm = CreateEmailOptions.builder()
       .from("CineRate <no-reply@cine-rate.site>")
                .to(email)
                .subject("Confirm your account")
                .html("""
                    <h2>CineRate 🎬</h2>
                    <p>Click for confirm your account:</p>
                    <a href="https://cine-rate.site/auth/register/confirm?token=%s">
                        Confirm account
                    </a>
                """.formatted(tokenTemp))
                .build();
        resend.emails().send(sendEm);
    return true;
  }
}