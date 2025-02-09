package com.healthcare.repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthcare.entities.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	List<Appointment> findByDoctor_DoctorId(Long doctorId);
    List<Appointment> findByPatient_UserId(Long patientId);
    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Appointment a WHERE a.doctor.id = :doctorId AND a.startTime <= :startTime AND a.endTime >= :endTime")
    boolean existsByDoctorIdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(@Param("doctorId") Long doctorId, @Param("startTime") LocalTime localTime, @Param("endTime") LocalTime localTime2);
}