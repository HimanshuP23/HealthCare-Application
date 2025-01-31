package com.healthcare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.dto.SigninResponse;
import com.healthcare.entities.User;
import com.healthcare.security.JwtUtils;
import com.healthcare.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private AuthenticationManager authMgr;

	// sign up
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/signup")
	public ResponseEntity<?> userSignup(@RequestBody @Valid User u) {
		System.out.println("in sign up " + u);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(userService.userRegistration(u));
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid User usr) {
	    System.out.println("in sign in" + usr);

	    UsernamePasswordAuthenticationToken token = 
	        new UsernamePasswordAuthenticationToken(usr.getEmail(), usr.getPassword());
	    
	    Authentication verifiedToken = authMgr.authenticate(token);
	    String jwt = jwtUtils.generateJwtToken(verifiedToken);

	    // Retrieve role from the authenticated user
	    String role = verifiedToken.getAuthorities().stream()
	                  .map(grantedAuthority -> grantedAuthority.getAuthority())
	                  .findFirst()
	                  .orElse("UNKNOWN");

	    // Add the role to the response
	    SigninResponse resp = new SigninResponse(jwt, "Successful Auth!!!!", role);

	    return ResponseEntity.status(HttpStatus.CREATED).body(resp);
	}
	
	

}
