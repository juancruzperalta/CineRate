package com.service.auth;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.model.user.UserEntity;
import com.repository.user.UserRepository;

@Service
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JWTService jwt;

    public AuthService(UserRepository repo, PasswordEncoder encoder, JWTService jwt) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwt = jwt;
    }
    public String login(String email, String password) {

        UserEntity user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwt.generateToken(user);
    }

    public void register(String email, String password) {
      if (email == null || password == null) {
        throw new Error("fail to register");
      }
      if (repo.existsByEmail(email)) {
        throw new Error( "Email already exists");
      }
      UserEntity nuevoUser = new UserEntity();
      nuevoUser.setEmail(email);
      nuevoUser.setPassword(encoder.encode(password));
      repo.save(nuevoUser);
    }
}