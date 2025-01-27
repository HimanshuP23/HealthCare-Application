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
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@ToString
@AttributeOverride(name = "id", column = @Column(name="notification_id"))
public class Notification extends BaseEntity  {

	private String message;
	private NotificationStatus status;
	
	@JoinColumn(name = "patient_id",nullable = false,unique = true)
	private User patientId;
	
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
