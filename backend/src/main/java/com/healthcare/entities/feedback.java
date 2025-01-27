package com.heatlhcare.entites;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Transient;

public class feedback extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "feedback_id",nullable = false,unique = true)
	private int feedbackId;
	
	@JoinColumn(name = "patient_id", nullable = false)
	private User patientId;
	
	@JoinColumn(name = "doctor_id", nullable = false)
	private Doctor doctorId;
	
	@Column(name = "feedback_text")
	private String feedbacktext;
	
	@Column(name = "rating")
	private int rating;
	
	
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
