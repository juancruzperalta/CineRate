package com.controller.auth;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.auth.UserTokenDTO;
import com.model.user.UserEntity;
import com.service.auth.AuthService;
import com.service.auth.EmailService;
import com.service.auth.JWTService;
import com.model.auth.ChangePasswordDTO;
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

  private final AuthService service;
  private final EmailService emailService;
    private final JWTService jwt;
    public AuthController(AuthService service, EmailService emailService, JWTService jwt) {
        this.service = service;
        this.emailService = emailService;
        this.jwt = jwt;
    }

    @PostMapping("/login")
    public ResponseEntity<UserTokenDTO> login(@RequestBody UserEntity request) {
        String token = service.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new UserTokenDTO(token));
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserEntity request) {
      boolean resp = service.register(request.getEmail(), request.getPassword());
      if(resp){
        return ResponseEntity.status(HttpStatus.CREATED)
        .body("Registred");
      }else{
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body("Email already exists");
      }
    }
    @GetMapping("/validateToken")
      public ResponseEntity<Object> validateToken(Authentication auth) {
      return ResponseEntity.ok(
          AuthService.findByEmail(auth.getUsername())
      );
    }

    @PostMapping("/change-password")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Boolean> changePassword(@RequestBody ChangePasswordDTO dto,
        @AuthenticationPrincipal UserEntity us) {
      Object user = service.findByEmail(dto.getEmail());
      String email = (String) user;
      return ResponseEntity.ok(service.changePass(email, dto.getPasswordAct(), dto.getNewPassword()));
    }
        @PostMapping("/forgot-password")
    public ResponseEntity<Boolean> forgotPassword(@RequestBody String email) {
      String tokenTemp = jwt.generateTokenTemp(email);
      return ResponseEntity.ok(emailService.forgotPass(email, tokenTemp));
    }
}