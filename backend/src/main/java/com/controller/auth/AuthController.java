package com.controller.auth;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.auth.UserTokenDTO;
import com.model.user.UserEntity;
import com.service.auth.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<UserTokenDTO> login(@RequestBody UserEntity request) {
        String token = service.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new UserTokenDTO(token));
    }
    @PostMapping("/register")
    public void register(@RequestBody UserEntity request) {
        service.register(request.getEmail(), request.getPassword());
    }
}