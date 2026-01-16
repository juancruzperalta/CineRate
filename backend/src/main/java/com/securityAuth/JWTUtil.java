package com.securityAuth;

import java.security.Key;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {
	
  /*Acá vamos a validar el token*/
  // Es un token de prueba
      @Value("${jwt.secret}")
      private String secret;
      private Key getKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
      }
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public List<String> extractRoles(String token) {
    	Object rolesObject = extractClaims(token).get("roles");
        if (rolesObject instanceof List<?> list) {
            List<String> roles = new ArrayList<>();
            for (Object r : list) {
                roles.add(r.toString());
            }
            return roles;
        }
        return new ArrayList<>();
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            System.out.println("JWT INVALIDO: " + e.getMessage());
            return false;
        }
    }

}