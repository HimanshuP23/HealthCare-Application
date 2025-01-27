package com.heatlhcare.entites;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicLong;

import org.hibernate.validator.internal.constraintvalidators.bv.number.bound.decimal.DecimalMaxValidatorForLong;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "payments")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@AttributeOverride(name = "id", column = @Column(name= "user_id"))
public class Payment{
	
	// foreign Key
	@JoinColumn(name = "appointment_id", nullable = false,unique = true)
	private int appointmentId;
	
	@Column(name = "payment_id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int paymentId;
	
	@Column(name = "amount_paid", nullable = false,unique = true)
	private double amountPaid;
	
	@Column(name = "payment_method", nullable = false)
	private PaymentMethod paymentMethod;
	
	 @Column(nullable = false, unique = true)
	    private String transactionId;

	    private static final AtomicLong counter = new AtomicLong(1);

	    @PrePersist
	    private void generateTransactionId() {
	        if (this.transactionId == null) {
	            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
	            this.transactionId = "TXN" + timestamp + counter.getAndIncrement();
	        }
	    }
	
	@Column(name = "payment_status", nullable = false)
	private PaymentStatus pyamentStatus;
	@Column(name = "payment_date", nullable = false)
	private LocalDateTime paymentDate;
	
	// foreign Key
	@JoinColumn(name = "patient_id", nullable = false,unique = true)
	private User patientId;
	
	// foreign Key
	@JoinColumn(name = "doctor_id", nullable = false,unique = true)
	private Doctor doctorId;
	


}
