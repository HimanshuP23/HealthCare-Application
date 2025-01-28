package com.healthcare.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomJwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, 
                                    FilterChain filterChain)
            throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);

            try {
                // Validate the JWT and populate authentication
                Authentication authentication = jwtUtils.populateAuthenticationTokenFromJWT(jwt);
                
                // Validate if the user has the required role (optional based on endpoints)
                if (authentication != null) {
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("Authentication saved in Security Context");
                }
            } catch (Exception e) {
                System.err.println("Invalid JWT or insufficient permissions: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        
        String path = request.getRequestURI();
        return path.startsWith("/public") || path.equals("/login"); 
    }
}
