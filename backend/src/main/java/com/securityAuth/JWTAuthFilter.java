package com.securityAuth;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
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

@Component
public class JWTAuthFilter extends OncePerRequestFilter {
  private final JWTUtil jwtUtil;
    private final UserRepository repo;

    public JWTAuthFilter(JWTUtil jwtUtil, UserRepository repo) {
        this.jwtUtil = jwtUtil;
        this.repo = repo;
    }
private static final List<String> PRIVATE_PATHS = List.of(
    "/api/watchLater",
    "/api/favorite",
    "/api/vote",
    "/user/data",
    "/auth/change-password"
);
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        String token = null;
        String path = request.getServletPath();
      boolean isPrivate = PRIVATE_PATHS.stream().anyMatch(path::startsWith);

if (!isPrivate) {
    filterChain.doFilter(request, response);
    return;
}
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
        if (token == null && request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        if (token == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
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