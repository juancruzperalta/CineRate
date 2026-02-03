package com.service.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
@Service
public class RateLimitSecurity {
  private static final long BLOCK_TIME = 15 * 60 * 1000;
  Map<String, long[]> emailAndTimeAndCount = new HashMap<>();
    Map<String, long[]> rateLimitForgotPassword = new HashMap<>();
  // long[0] = timeStart
  // long[1] = count
  public void create(String email, boolean isSendEmail) {
    if (isSendEmail) {
      rateLimitForgotPassword.put(email, new long[] { System.currentTimeMillis(), 0 });
    }else{
      emailAndTimeAndCount.put(email, new long[] { System.currentTimeMillis(), 0 });
    }
  }

  public boolean existsEmail(String email, boolean isSendEmail) {
    if (isSendEmail) {
      return rateLimitForgotPassword.containsKey(email);
    }else{
      return emailAndTimeAndCount.containsKey(email);
    }
  }

  public boolean checkEmail(String email) {
    int countMax = 5;
    long[] timeStart = emailAndTimeAndCount.get(email);
    if (timeStart == null) {
      return false;
    }
    timeStart[1]++;
    long now = System.currentTimeMillis();
    if (now - timeStart[0] > BLOCK_TIME) {
      emailAndTimeAndCount.remove(email);
      return true;
    }
    if (now - timeStart[0] < BLOCK_TIME && timeStart[1] >= countMax) {
      return false;
    }
    return true;
  }
  public boolean checkForgot(String email) {
    int countMax = 2;
    long[] timeStart = rateLimitForgotPassword.get(email);
    if (timeStart == null) {
      return false;
    }
    timeStart[1]++;
    long now = System.currentTimeMillis();
    if (now - timeStart[0] > BLOCK_TIME) {
      rateLimitForgotPassword.remove(email);
      return true;
    }
    if (now - timeStart[0] < BLOCK_TIME && timeStart[1] >= countMax) {
      return false;
    }
    return true;
  }
  public void isLogged(String email, boolean isSendEmail){
    if(isSendEmail){
      rateLimitForgotPassword.remove(email);
    }else{
      emailAndTimeAndCount.remove(email);
    }
  }
}
