package com.healthcare.controller;

import com.healthcare.dto.AppointmentDto;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.AppointmentStatus;
import com.healthcare.entities.Doctor;
import com.healthcare.entities.User;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.service.AppointmentService;
import com.healthcare.service.AppointmentServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private AppointmentRepository appointmentRepository;

    
    @PreAuthorize("hasRole('PATIENT')")
    @PostMapping("/addAppointment")
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentDto appointmentDto) {
        try {
            System.out.println("Appointment Date: " + appointmentDto.getAppointmentDate());
            Appointment appointment = new Appointment();
            appointment.setAppointmentDate(appointmentDto.getAppointmentDate());
            appointment.setStartTime(appointmentDto.getStartTime());
            appointment.setEndTime(appointmentDto.getEndTime());
            appointment.setPatient(new User(appointmentDto.getPatientId()));
            appointment.setStatus(AppointmentStatus.PENDING);
            
            Doctor doctor = new Doctor();
            doctor.setDoctorId(appointmentDto.getDoctorId());
            appointment.setDoctor(doctor);
            System.out.println(doctor);
            // Use the updated slot check (including appointmentDate)
            if (appointmentService.isSlotAvailable(
                    appointmentDto.getDoctorId(),
                    appointmentDto.getAppointmentDate(),
                    appointmentDto.getStartTime(),
                    appointmentDto.getEndTime())) {
                return ResponseEntity.ok(appointmentService.bookAppointment(appointment));
            }
            return ResponseEntity.badRequest().body("Slot is unavailable");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    @GetMapping("/get")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    
    @PreAuthorize("hasRole('PATIENT') or hasRole('ADMIN')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByUser(userId));
    }

    
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Long doctorId) {
    	System.out.println(doctorId);
    	return ResponseEntity.ok(appointmentService.getAppointmentsByDoctor(doctorId));
       
    }

    
    
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR')")
    @GetMapping("/user/history/{userId}")
    public ResponseEntity<List<Appointment>> getUserAppointmentHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(appointmentService.getUserAppointmentHistory(userId));
    }

    
    @PreAuthorize("hasRole('DOCTOR')")
    @GetMapping("/doctor/dashboard/{doctorId}")
    public ResponseEntity<?> getDoctorAppointments(@PathVariable Long doctorId) {
        List<AppointmentDto> appointmentDtos = appointmentService.getDoctorDashboard(doctorId);
        if (appointmentDtos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(appointmentDtos);
    }


    
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment) {
    	System.out.println(id);
    	System.out.println(appointment);
        return ResponseEntity.ok(appointmentService.updateAppointment(id, appointment));
    }

    
    
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long id) {
        boolean isCanceled = appointmentService.cancelAppointment(id);
        if (isCanceled) {
            return ResponseEntity.ok("Appointment cancelled successfully");
        }
        return ResponseEntity.badRequest().body("Cannot cancel a completed appointment");
    }
    
    
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @GetMapping("/scheduled/count")
    public long getTotalAppointmentScheduledCount() {
        return appointmentService.getAppointmentScheduledCounts();
    }
    
    
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @GetMapping("/pending/count")
    public long getTotalAppointmentPendingCount() {
        return appointmentService.getAppointmentPendingCounts();
    }
    
    
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @GetMapping("/completed/count")
    public long getTotalAppointmentCompletedCount() {
        return appointmentService.getAppointmentCompletedCounts();
    }
    
    
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    @GetMapping("/cancelled/count")
    public long getTotalAppointmentCancelledCount() {
        return appointmentService.getAppointmentCancelledCounts();
    }
}