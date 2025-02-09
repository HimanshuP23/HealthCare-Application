package com.healthcare.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.dto.PaymentRequestDTO;
import com.healthcare.dto.PaymentResponseDTO;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.Payment;
import com.healthcare.exceptions.EntityNotFoundException;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.PaymentRepository;



@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

	@Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public PaymentResponseDTO addPayment(PaymentRequestDTO paymentRequestDTO) {
        Appointment appointment = appointmentRepository.findById(paymentRequestDTO.getAppointmentId())
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        Payment payment = new Payment();
        payment.setAmountPaid(paymentRequestDTO.getAmountPaid());
        payment.setPaymentMethod(paymentRequestDTO.getPaymentMethod());
        payment.setPaymentStatus(paymentRequestDTO.getPaymentStatus());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setAppointment(appointment);

        // Generate unique transaction ID
        String transactionId = generateTransactionId();
        payment.setTransactionId(transactionId);

        paymentRepository.save(payment);
        return mapToDTO(payment);
    }
    
 // Method to generate a unique transaction ID
    private String generateTransactionId() {
        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")); // Format: YYYYMMDDHHMMSS
        String uniqueId = UUID.randomUUID().toString().substring(0, 8); // Get first 8 chars of UUID
        return formattedDate + "-" + uniqueId;
    }

    @Override
    public List<PaymentResponseDTO> getAllPayments() {
        return paymentRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<PaymentResponseDTO> getPaymentsByUserId(Long userId) {
        return paymentRepository.findByAppointment_Patient_UserId(userId)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public PaymentResponseDTO getPaymentByAppointmentId(Long appointmentId) {
        Payment payment = paymentRepository.findByAppointment_Id(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found for this appointment"));
        return mapToDTO(payment);
    }

    @Override
    public PaymentResponseDTO updatePayment(Long id, PaymentRequestDTO paymentRequestDTO) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found"));

        payment.setAmountPaid(paymentRequestDTO.getAmountPaid());
        payment.setPaymentStatus(paymentRequestDTO.getPaymentStatus());

        paymentRepository.save(payment);
        return mapToDTO(payment);
    }

    @Override
    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new EntityNotFoundException("Payment not found");
        }
        paymentRepository.deleteById(id);
    }

    @Override
    public PaymentResponseDTO mapToDTO(Payment payment) {
        PaymentResponseDTO dto = new PaymentResponseDTO();
        dto.setPaymentId(payment.getPaymentId());
        dto.setAmountPaid(payment.getAmountPaid());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setTransactionId(payment.getTransactionId());
        dto.setPaymentStatus(payment.getPaymentStatus());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setAppointmentId(payment.getAppointment().getId());
        return dto;
    }
}
