package com;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {
  @Value("${MAIL_USER}")
  private String mailUser;

  @Value("${MAIL_PASS}")
  private String mailPass;
//mail
  @Bean
  public JavaMailSender javaMailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    mailSender.setHost("smtp.gmail.com");
    mailSender.setUsername(mailUser);
    mailSender.setPort(587);
    mailSender.setPassword(mailPass);
    Properties props = mailSender.getJavaMailProperties();
    props.put("mail.transport.protocol", "smtp");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.ssl.enable", "false");
    props.put("mail.debug", "true");

    return mailSender;
  }
  @Autowired
private JavaMailSender mailSender;

@Bean
CommandLineRunner testMail() {
    return args -> {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("juanpera3000@gmail.com");
        msg.setSubject("Test Mail");
        msg.setText("Funciona en Railway!");
        mailSender.send(msg);
        System.out.println("Mail enviado!");
    };
}
}