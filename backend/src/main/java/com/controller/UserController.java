package com.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.user.UserDTO;
import com.model.user.UserEntity;
import com.securityAuth.JWTUtil;
import com.service.auth.JWTService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@RestController
@RequestMapping("/user")
public class UserController {
  @Autowired
  JWTUtil jwt;
  @GetMapping("/data")
    public ResponseEntity<UserDTO> getDataUser(@AuthenticationPrincipal UserEntity user) {
      UserDTO dto = new UserDTO();
      dto.setId(user.getId());
      dto.setEmail(user.getEmail());
      dto.setCreated_at(user.getCreatedAt());
      return ResponseEntity.ok(dto);
    }

      @GetMapping("/checkLogged")
    public Boolean getDataUser(HttpServletRequest request) {
          Cookie[] cookies = request.getCookies();

    if (cookies == null) return false;

    for (Cookie cookie : cookies) {
        if ("token".equals(cookie.getName())) {
          if(jwt.validateToken(cookie.getName())){
            return true;
          }else{
            return false;
          }
        }
    }

    return false;
    }
}