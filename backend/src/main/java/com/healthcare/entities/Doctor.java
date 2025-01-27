package com.healthcare.entities;

import java.sql.Timestamp;
import java.time.LocalTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "doctors")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;

    @Column(name = "specialization", nullable = false, length = 100)
    private String specialization;

    @Column(name = "qualification", nullable = false, length = 100)
    private String qualification;

    @Column(name = "experience_years", nullable = false)
    private int experienceYears;

    @Column(name = "clinic_address", nullable = false, length = 255)
    private String clinicAddress;

    @Column(name = "consultation_fee", nullable = false)
    private Double consultationFee;

    @Column(name = "available_days", nullable = false, length = 100)
    private String availableDays;

    @Column(name = "available_time_start", nullable = false)
    private LocalTime availableTimeStart;

    @Column(name = "available_time_end", nullable = false)
    private LocalTime availableTimeEnd;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Prescription> prescriptions;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<MedicalRecord> medicalRecords;
}
