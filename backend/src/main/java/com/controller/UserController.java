package com.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.user.UserDTO;
import com.model.user.UserEntity;
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

  @GetMapping("/data")
    public ResponseEntity<UserDTO> getDataUser(@AuthenticationPrincipal UserEntity user) {
      UserDTO dto = new UserDTO();
      dto.setId(user.getId());
      dto.setEmail(user.getEmail());
      dto.setCreated_at(user.getCreated_at());
      return ResponseEntity.ok(dto);
    }
}