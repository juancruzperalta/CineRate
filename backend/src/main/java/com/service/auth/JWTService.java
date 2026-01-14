package com.service.auth;

import java.security.Key;
import java.sql.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.model.user.UserEntity;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
@Service
public class JWTService {
      @Value("${jwt.secret}")
      private String secret;

      private Key getKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
      }
    private final long EXPIRATION = 1000 * 60 * 60 * 24; // 24h

    public String generateToken(UserEntity user) {
        return Jwts.builder()
                .setSubject(user.getId().toString()) 
                .claim("role", user.getRole())
                .setIssuedAt(new java.util.Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }
		public String extractUserId(String token) {
      return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
      }
}
