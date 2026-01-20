package com.service.auth;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
  
  private final JavaMailSender mailSender;

  public EmailService(JavaMailSender mailSender){
    this.mailSender = mailSender;
  }
    public void sendResetPassword(String email, String token) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(email);
    message.setSubject("Change Password");
    message.setText(
      "Goint to change password:\n" +
      "http://localhost:5173/change-password?token=" + token
    );
    mailSender.send(message);
  }

  public boolean forgotPass(String email, String tokenTemp) {
      this.sendResetPassword(email, tokenTemp);
            return true;
		}
}