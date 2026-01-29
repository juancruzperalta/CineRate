package com.securityAuth;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.model.user.UserEntity;
import com.repository.user.UserRepository;
import com.service.auth.JWTService;
import com.service.user.UserService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

// @Component
public class JWTAuthFilter extends OncePerRequestFilter {
  private final JWTUtil jwtUtil;
    private final UserRepository repo;

    public JWTAuthFilter(JWTUtil jwtUtil, UserRepository repo) {
        this.jwtUtil = jwtUtil;
        this.repo = repo;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
          
        String token = null;
        String path = request.getServletPath();
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
        token = authHeader.substring(7);
        String idUser = jwtUtil.extractUsername(token);
        boolean valido = false;
        try {
            valido = jwtUtil.validateToken(token);
        } catch (Exception e) {
            System.out.println("ERROR validando token: " + e.getMessage());
        }
        if (valido && SecurityContextHolder.getContext().getAuthentication() == null) {

        UserEntity user = repo.findById(UUID.fromString(idUser)).orElseThrow();

        List<GrantedAuthority> authorities = List.of(
          new SimpleGrantedAuthority("ROLE_" + user.getRole())
           );


          UsernamePasswordAuthenticationToken auth =
                  new UsernamePasswordAuthenticationToken(user, null, authorities);

          SecurityContextHolder.getContext().setAuthentication(auth);
      }
        filterChain.doFilter(request, response);
    }
}