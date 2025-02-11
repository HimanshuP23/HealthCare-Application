package com.healthcare.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.healthcare.entities.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Check if any appointment exists for the given doctor on the given date 
    // where the new appointment's time overlaps with an existing one.
    boolean existsByDoctor_DoctorIdAndAppointmentDateAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
            Long doctorId, 
            LocalDate appointmentDate, 
            LocalTime endTime, 
            LocalTime startTime);

    List<Appointment> findByPatient_UserId(Long userId);

    List<Appointment> findByDoctor_DoctorId(Long doctorId);
    
    @Query("SELECT COUNT(a) FROM Appointment a where a.status = 'SCHEDULED'")
    long getAppointmentsScheduledCount();
    
    @Query("SELECT COUNT(a) FROM Appointment a where a.status = 'PENDING'")
    long getAppointmentsPendingCount();
    
    @Query("SELECT COUNT(a) FROM Appointment a where a.status = 'COMPLETED'")
    long getAppointmentsCompletedCount();
    
    @Query("SELECT COUNT(a) FROM Appointment a where a.status = 'CANCELLED'")
    long getAppointmentsCancelledCount();
}
