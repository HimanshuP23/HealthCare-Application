package com.healthcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.healthcare.entities.Appointment;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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
}
