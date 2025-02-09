package com.healthcare.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.healthcare.dto.PaymentRequestDTO;
import com.healthcare.dto.PaymentResponseDTO;
import com.healthcare.service.PaymentService;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;

    // Endpoint to create a PaymentIntent using Stripe.
    @PostMapping("/create-payment-intent")
    @PreAuthorize("hasRole('PATIENT') or hasRole('ADMIN') or hasRole('DOCTOR')")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> data) {
        // Extract the amount and appointmentId from the request body.
        Double amount = Double.valueOf(data.get("amount").toString());
        Long appointmentId = Long.valueOf(data.get("appointmentId").toString());
        Map<String, String> responseData = paymentService.createPaymentIntent(amount, appointmentId);
        return ResponseEntity.ok(responseData);
    }
    
    @PostMapping("/")
    @PreAuthorize("hasRole('PATIENT') or hasRole('ADMIN')")
    public ResponseEntity<PaymentResponseDTO> addPayment(@RequestBody PaymentRequestDTO paymentRequestDTO) {
        return ResponseEntity.ok(paymentService.addPayment(paymentRequestDTO));
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PaymentResponseDTO>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    public ResponseEntity<List<PaymentResponseDTO>> getPaymentsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(paymentService.getPaymentsByUserId(userId));
    }

    @GetMapping("/appointment/{appointmentId}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('ADMIN') or hasRole('DOCTOR')")
    public ResponseEntity<PaymentResponseDTO> getPaymentByAppointmentId(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(paymentService.getPaymentByAppointmentId(appointmentId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PaymentResponseDTO> updatePayment(@PathVariable Long id, 
                                                            @RequestBody PaymentRequestDTO paymentRequestDTO) {
        return ResponseEntity.ok(paymentService.updatePayment(id, paymentRequestDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.ok("Payment deleted successfully");
    }
}
