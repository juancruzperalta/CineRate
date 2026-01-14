package com.service.user;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.model.user.UserDTO;
import com.model.user.UserEntity;
import com.repository.user.UserRepository;

@Service
public class UserService {
  
    private final PasswordEncoder password;
    @Autowired
    private UserRepository repo;
   public UserService(PasswordEncoder password) {
        this.password = password;
    }

    public UserEntity createUser(String email, String rawPassword) {
        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setPassword(password.encode(rawPassword));
        return user;
    }

    public UserDTO getDataUser(UUID idUser) {
      UserEntity user = repo.findById(idUser).orElseThrow(() -> new RuntimeException("User error"));
      
      UserDTO dto = new UserDTO();
      dto.setId(user.getId());
      dto.setEmail(user.getEmail());
      return dto;
    }
}
