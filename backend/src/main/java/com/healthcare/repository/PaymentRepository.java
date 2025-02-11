package com.healthcare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.healthcare.entities.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByAppointment_Patient_UserId(Long userId);
    Optional<Payment> findByAppointment_Id(Long appointmentId);
    
    @Query("SELECT COUNT(p) FROM Payment p where p.paymentStatus = 'COMPLETED'")
    long getPaymentsCompletedCount();
    
    @Query("SELECT COUNT(p) FROM Payment p where p.paymentStatus = 'PENDING'")
    long getPaymentsPendingCount();
    
}
