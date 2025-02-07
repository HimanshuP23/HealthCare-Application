package com.healthcare.service;

import com.healthcare.entities.Appointment;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentService {
    boolean isSlotAvailable(Appointment appointment);
    Appointment bookAppointment(Appointment appointment);
    Appointment updateAppointment(Long id, Appointment appointment);
    boolean cancelAppointment(Long id);
    List<Appointment> getAllAppointments();
    List<Appointment> getAppointmentsByUser(Long userId);
    List<Appointment> getAppointmentsByDoctor(Long doctorId);
    List<Appointment> getUserAppointmentHistory(Long userId);
    List<Appointment> getDoctorDashboard(Long doctorId);
	boolean isSlotAvailable(Long doctorId, LocalDateTime startTime, LocalDateTime endTime);
}