package com.healthcare.dto;


import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.healthcare.entities.AppointmentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {
    
    private LocalDate appointmentDate;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private AppointmentStatus status;
    private Long doctorId;
    private Long patientId;
    private Timestamp createdAt;
}