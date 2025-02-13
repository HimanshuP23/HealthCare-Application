package com.healthcare.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@Autowired
    private JavaMailSender mailSender;
	
	private Map<String, String> resetTokens = new HashMap<>();
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	// sign up
	
	@PostMapping("/signup")
	public ResponseEntity<?> userSignup(@Valid @RequestBody  User u) {
		System.out.println("in sign up " + u);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(userService.userRegistration(u));
	}

	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody User usr) {
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
	    SigninResponse resp = new SigninResponse(jwt, "Successful Auth!!!!", role, user.getUserId(),user);
	    SigninResponse resp1 = new SigninResponse(jwt, "Successful Auth!!!!", role, user.getUserId(), doctorDetails,user);

	    return ResponseEntity.status(HttpStatus.CREATED)
	            .body("PATIENT".equals(role) ? resp : resp1);
	    
	}
	
	
	@GetMapping("/patients/count")
    public long getTotalPatientCount() {
        return userService.getPatientCounts();
    }	
	
	
	@PostMapping("/password/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Email not found!");
        }

        String resetToken = UUID.randomUUID().toString(); // Generate random token
        resetTokens.put(resetToken, email); // Store token with email mapping

        // Send email with reset link
        sendResetEmail(email, resetToken);

        return ResponseEntity.ok("Password reset link has been sent to your email.");
    }

    // Reset Password API
    @PostMapping("/password/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token,@RequestBody Map<String, String> request) {
    	String password = request.get("newPassword"); 
    	System.out.println(password);
    	String email = resetTokens.get(token);
        if (email == null) {
            return ResponseEntity.badRequest().body("Invalid or expired reset token!");
        }

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(password)); // Encrypt new password
        userRepository.save(user);

        resetTokens.remove(token); // Remove token after use

        return ResponseEntity.ok("Password has been reset successfully!");
    }

    // Helper Method: Send Reset Email
    private void sendResetEmail(String email, String resetToken) {
        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("Click the following link to reset your password: " + resetLink);
        mailSender.send(message);
    }

}
