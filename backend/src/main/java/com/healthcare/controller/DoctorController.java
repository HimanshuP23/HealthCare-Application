package com.healthcare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.healthcare.service.DoctorService;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

	@Autowired
    private DoctorService doctorService;
    
    
    
    @GetMapping("/getalldoctors")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    
    @GetMapping("/getdoctor/{doctorId}")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<Doctor> getDoctorDetails(@PathVariable Long doctorId) {
        return ResponseEntity.ok(doctorService.getDoctorDetails(doctorId));
    }
    
    
    @PostMapping("/createdoctor/{userId}")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN')")
    public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor, @PathVariable Long userId) {
        return ResponseEntity.ok(doctorService.createDoctor(doctor, userId));
    }
    
    
    @PutMapping("/updatedoctor/{doctorId}")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN')")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long doctorId, @RequestBody Doctor updatedDoctor) {
        return ResponseEntity.ok(doctorService.updateDoctor(doctorId, updatedDoctor));
    }

    
    @DeleteMapping("/deletedoctor/{doctorId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long doctorId) {
        doctorService.deleteDoctor(doctorId);
        return ResponseEntity.noContent().build();
    }
    
    
    @GetMapping("/getdoctorsbyspecialization")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialization(@RequestParam String specialization) {
        return ResponseEntity.ok(doctorService.getDoctorsBySpecialization(specialization));
    }

    
    @GetMapping("/getdoctorsbyqualification")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getDoctorsByQualification(@RequestParam String qualification) {
        return ResponseEntity.ok(doctorService.getDoctorsByQualification(qualification));
    }

    
    @GetMapping("/getdoctorsbyexperience")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getDoctorsByExperienceYears(@RequestParam int experienceYears) {
        return ResponseEntity.ok(doctorService.getDoctorsByExperienceYears(experienceYears));
    }

    
    @GetMapping("/getdoctorsbyaddress")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getDoctorsByClinicAddress(@RequestParam String clinicAddress) {
        return ResponseEntity.ok(doctorService.getDoctorsByClinicAddress(clinicAddress));
    }

    
    @GetMapping("/getdoctorsbydays")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public ResponseEntity<List<Doctor>> getDoctorsByAvailableDays(@RequestParam String availableDays) {
        return ResponseEntity.ok(doctorService.getDoctorsByAvailableDays(availableDays));
    }
    
    
    @GetMapping("/count")
    @PreAuthorize("hasAuthority('DOCTOR') or hasAuthority('ADMIN') or hasAuthority('PATIENT')")
    public long getTotalDoctorCount() {
        return doctorService.getDoctorCounts();
    }

}
