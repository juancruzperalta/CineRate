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
import com.model.user.UserEmailDTO;
import com.model.user.UserEntity;
import com.resend.core.exception.ResendException;
import com.service.auth.AuthService;
import com.service.auth.EmailService;
import com.service.auth.JWTService;
import com.model.auth.ChangePasswordDTO;
import com.model.auth.ForgotPasswordDTO;
@RestController
@RequestMapping("/auth")
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
      try {
            service.register(request.getTokenTemp(), request.getEmail(), request.getPassword());
      return ResponseEntity.ok("Registred");
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
      }
    }
    
    @PostMapping("/register-sendEmail")
    public ResponseEntity<String> registerSendEmail(@RequestBody UserEmailDTO email) throws ResendException {
      try{
        String tokenTemp = jwt.generateTokenTemp(email.getEmail());
        emailService.registerSendEmail(email.getEmail(), tokenTemp);
        return ResponseEntity.ok("Email has been send");
      
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
      }
    }

    @GetMapping("/validateToken")
      public ResponseEntity<Object> validateToken(Authentication auth) {
      return ResponseEntity.ok(
          AuthService.findByEmail(auth.getUsername())
      );
    }
    // Cuándo un usuario olvida su contraseña; logueado, y con el rol, permitimos cambiarla.
    @PostMapping("/change-password")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Boolean> changePassword(@RequestBody ChangePasswordDTO dto,
        @AuthenticationPrincipal UserEntity us) {
      Object user = service.findByEmail(dto.getEmail());
      String email = (String) user;
      return ResponseEntity.ok(service.changePass(email, dto.getPasswordAct(), dto.getNewPassword()));
    }

    // Aquí lo que hacemos es que el usuario olvidó su contraseña, entonces enviamos un token (generado por 15 minutos) y un email para verificar su email. (De ahi entrará a un link, que luego se redirigirá a reset-forgot-password con un token + su nueva contraseña para postear en la BD)
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody UserEmailDTO email) throws ResendException {
      try{
        String tokenTemp = jwt.generateTokenTemp(email.getEmail());
        emailService.forgotPass(email.getEmail(), tokenTemp);
      return ResponseEntity.ok("Email has been send to forgot password");
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
      }
    }
    // Postearemos segun el usuario nos envie confirmado por el email + el token + el new password.
    @PostMapping("/reset-forgot-password")
    public ResponseEntity<Boolean> resetForgotPassword(@RequestBody ForgotPasswordDTO forgotPassword) {
      return ResponseEntity.ok(service.resetForgotPassowrd(forgotPassword.getTokenTemp(), forgotPassword.getPassword(),forgotPassword.getConfirmPassword()));
    }

}