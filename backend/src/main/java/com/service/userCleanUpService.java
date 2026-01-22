package com.service;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.repository.user.UserRepository;

import jakarta.transaction.Transactional;
@Service
public class userCleanUpService {
  UserRepository repo;

  public userCleanUpService(UserRepository repo) {
    this.repo = repo;
  }
    @Transactional
    @Scheduled(fixedRate = 300000) 
    public void cleanUnconfirmedUsers() {
        LocalDateTime limit = LocalDateTime.now().minusMinutes(15);
        repo.deleteInactiveUsers(limit);
    }
}
