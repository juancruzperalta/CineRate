package com.service.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.model.user.UserEntity;

@Service
public class UserService {
  
  private final PasswordEncoder password;

   public UserService(PasswordEncoder password) {
        this.password = password;
    }

    public UserEntity createUser(String email, String rawPassword) {
        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setPassword(password.encode(rawPassword));
        return user;
    }
}
