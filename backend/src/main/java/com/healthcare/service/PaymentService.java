package com.healthcare.service;

import java.util.List;

import com.healthcare.dto.PaymentRequestDTO;
import com.healthcare.dto.PaymentResponseDTO;
import com.healthcare.entities.Payment;

public interface PaymentService {

	PaymentResponseDTO addPayment(PaymentRequestDTO paymentRequestDTO);
	
	List<PaymentResponseDTO> getAllPayments();
	
	List<PaymentResponseDTO> getPaymentsByUserId(Long userId);
	
	PaymentResponseDTO getPaymentByAppointmentId(Long appointmentId);

	PaymentResponseDTO updatePayment(Long id, PaymentRequestDTO paymentRequestDTO);
	
	void deletePayment(Long id);
	
	PaymentResponseDTO mapToDTO(Payment payment);
}
