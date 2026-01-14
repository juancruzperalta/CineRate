package com.service.auth;
import java.sql.Date;

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
        public String register(String email, String password, Date created_at) {
          if (email == null || password == null) {
            return "fail to register";
          }
          if (repo.existsByEmail(email)) {
            return "Email already exists";
          }
          UserEntity nuevoUser = new UserEntity();
          nuevoUser.setEmail(email);
          nuevoUser.setPassword(encoder.encode(password));
          nuevoUser.setCreated_at(created_at);
          repo.save(nuevoUser);
          
          return "Register";
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
}