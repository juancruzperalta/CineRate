package com.service.auth;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.model.user.UserEntity;
import com.repository.user.UserRepository;
import com.service.security.RateLimitSecurity;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class AuthService {

    private final UserRepository repo;
            private final PasswordEncoder encoder;
            private final JWTService jwt;
          private RateLimitSecurity rateLimit;
            public AuthService(UserRepository repo, PasswordEncoder encoder, JWTService jwt, RateLimitSecurity rateLimit) {
              this.repo = repo;
              this.encoder = encoder;
              this.jwt = jwt;
              this.rateLimit = rateLimit;
            }
        //Logueo un usuario. Valido un email válido y macheo las password hasheadas
        public String login(String email, String password,HttpServletResponse response) {
          if (!rateLimit.existsEmail(email,false)) { 
            rateLimit.create(email,false);
          }
          if (!rateLimit.checkEmail(email)) {
            throw new IllegalArgumentException("You should wait a few minutes to login renew");
          }
          if (password == null || email == null) {
            throw new IllegalArgumentException("Credentials is not valid");
          }
          UserEntity user = repo.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
          ResponseCookie cookie = ResponseCookie.from("token", jwt.generateToken(user))
          .httpOnly(true)
          .secure(true)
          .path("/")
          .sameSite("None")
          .maxAge(86400)
          .build();
          response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
          if (!user.isActive()) {
              throw new IllegalArgumentException("User doesn't finish registration");
            }
            if (!encoder.matches(password, user.getPassword())) {
              throw new IllegalArgumentException("Invalid credentials");
            }
            rateLimit.isLogged(email,false);
            return "Logged";
        }
        //registro un usuario. hasheo la password.
        //Verifico que no haya un email igual o existente.
        public boolean register(String password, String tokenTemp,HttpServletResponse response) {
          ResponseCookie cookie = ResponseCookie.from("tokenTemp", tokenTemp)
          .httpOnly(true)
          .secure(true)
          .path("/")
          .sameSite("None")
          .maxAge(86400)
          .build();
          if (password == null) {
            return false;
          }
          if (password.length() < 8 || password.isBlank()) {
            throw new IllegalArgumentException("The password length must be > 8 characters");
          }
          UserEntity nuevoUser = repo.findBytokenTemp(tokenTemp)
          .orElseThrow(() -> new RuntimeException("User not found"));
          if (nuevoUser.getCreatedAt().isBefore(LocalDateTime.now().minusMinutes(15)))   {
            throw new IllegalArgumentException("Your token has been expired or incorrect");
          }
          if (nuevoUser.isActive()) {
            throw new IllegalArgumentException("You already registred");
          }
          nuevoUser.setTokenTemp(null);
          nuevoUser.setEmail(nuevoUser.getEmail());
          nuevoUser.setPassword(encoder.encode(password));
          nuevoUser.setIsActive(true);
          repo.save(nuevoUser);
          response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return true;
        }

        //busco por el email del username, para validar el token una vez el usuario
        //este ya inicializado (por localstorage, me guarde el token para no tener que loguearse cada vez)
        public Object findByEmail(String username) {
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
                    if (newPassword.length() < 8 || newPassword.isBlank()) {
            throw new IllegalArgumentException("The password length must be > 8 characters");
          }
            UserEntity user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            if (user == null) {
              throw new IllegalArgumentException("User not found");
                }
            if (email.isBlank()) {
              throw new IllegalArgumentException("The email is distint for your registred");
            }
            if (passwordAct.isBlank() || newPassword.isBlank()) {
                        throw new IllegalArgumentException("Password is empty");
          }
          if (!encoder.matches(passwordAct, user.getPassword())) {
            throw new IllegalArgumentException("Your current password is not correct");
          }
          if (encoder.matches(passwordAct, user.getPassword())) {
            user.setPassword(encoder.encode(newPassword));
            repo.save(user);
            return true;
          }
          return false;
        }

        public boolean resetForgotPassowrd(String tokenTemp, String password, String confirmPassword, HttpServletResponse response) {
           ResponseCookie cookie = ResponseCookie.from("tokenTemp", tokenTemp)
          .httpOnly(true)
          .secure(true)
          .path("/")
          .sameSite("None")
          .maxAge(86400)
          .build();
          if (tokenTemp == null || tokenTemp.isBlank()) {
      throw new IllegalArgumentException("Your user is not registred");
          }
          if (password.isBlank() || confirmPassword.isBlank()) {
            throw new IllegalArgumentException("Password is empty");
          }
                      if (password.length() < 8 || password.isBlank()) {
            throw new IllegalArgumentException("The password length must be > 8 characters");
          }
          UserEntity us = repo.findBytokenTemp(tokenTemp).orElseThrow(() -> new RuntimeException("User not found"));
          if (!password.equals(confirmPassword)){
          throw new IllegalArgumentException("Passwords does't matchs");
          }
          if (encoder.matches(password, us.getPassword())) {
            throw new IllegalArgumentException("You already own this password");
          }
          rateLimit.isLogged(us.getEmail(),true);
            us.setPassword(encoder.encode(password));
            us.setTokenTemp(null);
            repo.save(us);
                      response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return true;
        }
        public void loggout() {
         ResponseCookie cookie = ResponseCookie.from("token", "")
          .httpOnly(true)
          .secure(true)
          .path("/")
          .sameSite("None")
          .maxAge(0)
          .build();
        ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logged out");
        }
    
}