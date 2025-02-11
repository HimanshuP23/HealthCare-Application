package com.healthcare.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.healthcare.entities.Notification;
import com.healthcare.entities.User;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
    List<Notification> findByUserAndStatus(User user, String status);
}
