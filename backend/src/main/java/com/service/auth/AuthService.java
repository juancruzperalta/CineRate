package com.service.auth;
import java.sql.Date;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.model.user.UserEntity;
import com.repository.user.UserRepository;

@Service
public class AuthService {

    private static UserRepository repo;
            private final PasswordEncoder encoder;
            private final JWTService jwt;
        
            public AuthService(UserRepository repo, PasswordEncoder encoder, JWTService jwt) {
              AuthService.repo = repo;
              this.encoder = encoder;
              this.jwt = jwt;
            }
        //Logueo un usuario. Valido un email válido y macheo las password hasheadas
        public String login(String email, String password) {
    
            UserEntity user = repo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
    
            if (!encoder.matches(password, user.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }
    
            return jwt.generateToken(user);
        }
        //registro un usuario. hasheo la password.
        //Verifico que no haya un email igual o existente.
        public boolean register(String email, String password) {
          if (email == null || password == null) {
            return false;
          }
          if (repo.existsByEmail(email)) {
            return false;
          }
          UserEntity nuevoUser = new UserEntity();
          nuevoUser.setEmail(email);
          nuevoUser.setPassword(encoder.encode(password));
          repo.save(nuevoUser);
          
          return true;
        }

        //busco por el email del username, para validar el token una vez el usuario
        //este ya inicializado (por localstorage, me guarde el token para no tener que loguearse cada vez)
        public static Object findByEmail(String username) {
          try {
            if (repo.existsByEmail(username)) {
              return username;
            }
          } catch (Exception e) {
            e.printStackTrace();
          }
          return null;
        }
        public boolean changePass(String email, String passwordAct, String newPassword) {
            UserEntity user = repo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
          if (encoder.matches(passwordAct, user.getPassword())) {
            user.setPassword(encoder.encode(newPassword));
            repo.save(user);
            return true;
          }
          return false;
        }

        public boolean resetForgotPassowrd(String tokenTemp, String password, String confirmPassword) {
          
          if (tokenTemp == null || tokenTemp.isBlank()) {
          throw new IllegalArgumentException("Token inválido");
            }
          UserEntity us = repo.findBytokenTemp(tokenTemp).orElseThrow(() -> new RuntimeException("User not found"));
          if (!password.equals(confirmPassword)){
          throw new IllegalArgumentException("Passwords does't matchs");
          }
          if (encoder.matches(password, us.getPassword())) {
          throw new IllegalArgumentException("You already own this password");
          }
            us.setPassword(encoder.encode(password));
            us.setTokenTemp(null);
            repo.save(us);
            return true;
        }
    
}