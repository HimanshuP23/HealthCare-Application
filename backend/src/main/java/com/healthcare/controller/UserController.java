package com.healthcare.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.dto.SigninResponse;
import com.healthcare.entities.Doctor;
import com.healthcare.entities.User;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.UserRepository;
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
	
	@Autowired
    private UserRepository userRepository;

	@Autowired
	DoctorRepository doctorRepository;
	
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
	    User user = userRepository.findByEmail(usr.getEmail()).orElseThrow();
	    System.out.println(user);
	    
	    Authentication verifiedToken = authMgr.authenticate(token);
	    String jwt = jwtUtils.generateJwtToken(verifiedToken);

	    // Retrieve role from the authenticated user
	    String role = verifiedToken.getAuthorities().stream()
	                  .map(grantedAuthority -> grantedAuthority.getAuthority())
	                  .findFirst()
	                  .orElse("UNKNOWN");
	    
//	  Fetch Doctor details only if the user is a doctor
	    Doctor doctorDetails = null;
	    if ("DOCTOR".equals(role)) {
	        doctorDetails = doctorRepository.findByUserId(user.getUserId()).orElse(null);
	    }
	    
	    // Add the role to the response
	    SigninResponse resp = new SigninResponse(jwt, "Successful Auth!!!!", role, user.getUserId());
	    SigninResponse resp1 = new SigninResponse(jwt, "Successful Auth!!!!", role, user.getUserId(), doctorDetails);

	    return ResponseEntity.status(HttpStatus.CREATED)
	            .body("PATIENT".equals(role) ? resp : resp1);
	    
	}
	
	

}
