package com.healthcare.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.healthcare.entities.Notification;
import com.healthcare.service.NotificationService;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    
    /**
     * Create a new notification and send email/SMS.
     * Example: POST /api/notifications/?userId=1&message=Your+appointment+is+confirmed
     */
    @PostMapping("/")
    public ResponseEntity<Notification> createNotification(@RequestParam Long userId,
                                                             @RequestParam String message) {
        Notification notification = notificationService.createNotification(userId, message);
        return ResponseEntity.ok(notification);
    }
    
    /**
     * Get all notifications (Admin only).
     */
    @GetMapping("/")
    public ResponseEntity<List<Notification>> getAllNotifications() {
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }
    
    /**
     * Get notifications for a specific user.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getUserNotifications(userId));
    }
    
    /**
     * Mark a notification as read.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Notification> markNotificationAsRead(@PathVariable Long id) {
        Notification updatedNotification = notificationService.markNotificationAsRead(id);
        return ResponseEntity.ok(updatedNotification);
    }
    
    /**
     * Delete a notification.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}
