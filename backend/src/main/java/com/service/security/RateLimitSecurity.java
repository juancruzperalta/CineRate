package com.service.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
@Service
public class RateLimitSecurity {
  private static final long BLOCK_TIME = 15 * 60 * 1000;
  Map<String, long[]> emailAndTimeAndCount = new HashMap<>();
  // long[0] = timeStart
  // long[1] = count
  public void create(String email) {
    emailAndTimeAndCount.put(email, new long[] { System.currentTimeMillis(), 0 });
  }
  public boolean existsEmail(String email) {
   return emailAndTimeAndCount.containsKey(email);
  }

  public boolean check(String email, boolean isSendEmail) {
    int countMax = 0;
    if (isSendEmail) {
      countMax = 1;
    } else {
      countMax = 3;
    }
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
    if (now - timeStart[0] < BLOCK_TIME && timeStart[1] > countMax) {
      return false;
    }
    return timeStart[1] <= 3;
  }
  public void isLogged(String email){
    emailAndTimeAndCount.remove(email);
  }
}
