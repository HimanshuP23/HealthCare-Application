package com.healthcare.entities;

import java.time.LocalDateTime;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@ToString
@AttributeOverride(name = "id",column = @Column(name="appointment_id"))
public class Appointment extends BaseEntity {

	@Column(name = "appointment_date", nullable = false)
	private LocalDateTime appointmentDate;
	@Column(name = "status", nullable = false)
	private AppointmentStatus status;
	@JoinColumn(name = "patient_id",nullable = false,unique = true)
	private User patientId;
	@JoinColumn(name = "doctor_id",nullable = false,unique = true)
	private Doctor doctorId;
	
	@Override
    @Transient
    public LocalDateTime getUpdatedAt() {
        return null;
    }

    @Override
    @Transient
    public void setUpdatedAt(LocalDateTime updatedAt) {
    }

}
