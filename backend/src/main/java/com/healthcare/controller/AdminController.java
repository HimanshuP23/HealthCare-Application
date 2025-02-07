package com.healthcare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.entities.Doctor;
import com.healthcare.entities.Role;
import com.healthcare.entities.User;
import com.healthcare.service.DoctorService;
import com.healthcare.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;
    @Autowired
    private DoctorService doctorService;

    // GET /: Get all users (Admin only)
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getallusers")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // GET /{id}: Get a user by ID
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/{id}")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // PUT /{id}: Update user details by ID
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/user/{id}")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    // DELETE /{id}: Delete a user by ID
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/user/{id}")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/adduser")
	public ResponseEntity<?> userSignup(@RequestBody @Valid User u) {
		System.out.println("in sign up " + u);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(userService.userRegistration(u));
	}
    

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getusersbyrole")
    public ResponseEntity<List<User>> getUsersByRole(@RequestParam("role") String role) {
        List<User> users;
        if (role.equalsIgnoreCase("ALL")) {
            users = userService.getAllUsers(); // Fetch all users if role is ALL
        } else {
            Role roleEnum = Role.valueOf(role.toUpperCase()); // Convert String to Role enum
            users = userService.getUsersByRole(roleEnum); // Fetch users by specific role
        }
        return ResponseEntity.ok(users);
    }
    
    
    
    
    //DOCTORS
    
    
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/doctor/getalldoctors")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/doctor/getdoctor/{doctorId}")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<Doctor> getDoctorDetails(@PathVariable Long doctorId) {
        return ResponseEntity.ok(doctorService.getDoctorDetails(doctorId));
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/doctor/createdoctor/{userId}")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN')")
    public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor, @PathVariable Long userId) {
        return ResponseEntity.ok(doctorService.createDoctor(doctor, userId));
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/doctor/updatedoctor/{doctorId}")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN')")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long doctorId, @RequestBody Doctor updatedDoctor) {
        return ResponseEntity.ok(doctorService.updateDoctor(doctorId, updatedDoctor));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/doctor/deletedoctor/{doctorId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long doctorId) {
        doctorService.deleteDoctor(doctorId);
        return ResponseEntity.noContent().build();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/doctor/getdoctorsbyspecialization")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialization(@RequestParam String specialization) {
        return ResponseEntity.ok(doctorService.getDoctorsBySpecialization(specialization));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/doctor/getdoctorsbyqualification")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getDoctorsByQualification(@RequestParam String qualification) {
        return ResponseEntity.ok(doctorService.getDoctorsByQualification(qualification));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/doctor/getdoctorsbyexperience")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getDoctorsByExperienceYears(@RequestParam int experienceYears) {
        return ResponseEntity.ok(doctorService.getDoctorsByExperienceYears(experienceYears));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/doctor/getdoctorsbyaddress")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getDoctorsByClinicAddress(@RequestParam String clinicAddress) {
        return ResponseEntity.ok(doctorService.getDoctorsByClinicAddress(clinicAddress));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/doctor/getdoctorsbydays")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getDoctorsByAvailableDays(@RequestParam String availableDays) {
        return ResponseEntity.ok(doctorService.getDoctorsByAvailableDays(availableDays));
    }

}
