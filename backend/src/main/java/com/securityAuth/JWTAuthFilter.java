package com.securityAuth;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.model.user.UserEntity;
import com.repository.user.UserRepository;
import com.service.auth.JWTService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {
  private final JWTUtil jwtUtil;
    @Autowired
    UserRepository repo;
    @Autowired
    JWTService service;
    public JWTAuthFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String bearerToken = request.getHeader("Authorization");
        String token = null;
        String path = request.getServletPath();
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            token = bearerToken.substring(7);
        }
        // si en el auth viene el token nullo, lo ignoro (para logearnos como minimo)
           if (
        path.startsWith("/auth/")
        || path.startsWith("/api/movie/")
        || path.startsWith("/api/serie/")
        || request.getMethod().equals("OPTIONS")
          ) {
              filterChain.doFilter(request, response);
              return;
          }
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        boolean valido = false;
        try {
            valido = jwtUtil.validateToken(token);
        } catch (Exception e) {
            System.out.println("ERROR validando token: " + e.getMessage());
        }

        if (token != null && valido && SecurityContextHolder.getContext().getAuthentication() == null) {

            List<String> roles = jwtUtil.extractRoles(token);
            String idUser = service.extractUserId(token);
            UserEntity user = repo.findById(UUID.fromString(idUser)).orElseThrow();
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            if (roles != null) {
                for (String role : roles) {
                    authorities.add(new SimpleGrantedAuthority(role));
                }
            }

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(user, null, authorities);

            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }
}