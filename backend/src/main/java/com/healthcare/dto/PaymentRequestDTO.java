package com.healthcare.dto;

import java.time.LocalDateTime;

import com.healthcare.entities.PaymentMethod;
import com.healthcare.entities.PaymentStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequestDTO {
    private Double amountPaid;
    private PaymentMethod paymentMethod;
    private String transactionId;
    private PaymentStatus paymentStatus;
    private Long appointmentId;
}
