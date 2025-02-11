package com.healthcare.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.healthcare.entities.Notification;
import com.healthcare.entities.User;
import com.healthcare.repository.NotificationRepository;
import com.healthcare.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private SmsService smsService;
    
    /**
     * Creates a notification, saves it to the database,
     * and sends an email and SMS to the user.
     */
    public Notification createNotification(Long userId, String message) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(message);
        notification.setStatus("PENDING");  // Initial status
        Notification savedNotification = notificationRepository.save(notification);
        
        String subject = "New Notification";
        // Trigger email and SMS asynchronously.
        emailService.sendNotificationEmail(user.getEmail(), subject, message);
        smsService.sendNotificationSms(user.getPhoneNumber(), message);
        
        return savedNotification;
    }
    
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }
    
    public List<Notification> getUserNotifications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }
    
    public Notification markNotificationAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found"));
        notification.setStatus("DELIVERED");
        return notificationRepository.save(notification);
    }
    
    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
