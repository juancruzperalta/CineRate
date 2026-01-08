package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.repository.UserRepository;

@RestController
@RequestMapping("/accounts")
public class UserController {
  
  @Autowired
  UserRepository repo;
  
  @GetMapping("/test")
  public long test() {
    return repo.count();
  }
}
