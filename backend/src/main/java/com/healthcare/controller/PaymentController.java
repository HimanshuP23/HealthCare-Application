package com.healthcare.controller;

import java.util.List;

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

    @PostMapping("/")
    public ResponseEntity<PaymentResponseDTO> addPayment(@RequestBody PaymentRequestDTO paymentRequestDTO) {
        return ResponseEntity.ok(paymentService.addPayment(paymentRequestDTO));
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PaymentResponseDTO>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentResponseDTO>> getPaymentsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(paymentService.getPaymentsByUserId(userId));
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<PaymentResponseDTO> getPaymentByAppointmentId(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(paymentService.getPaymentByAppointmentId(appointmentId));
    }

    @PutMapping("/{id}")
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
