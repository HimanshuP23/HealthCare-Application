package com.healthcare.service;

import com.twilio.*;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    // Inject Twilio properties from application.properties
    @Value("${twilio.accountSid}")
    private String accountSid;
    
    @Value("${twilio.authToken}")
    private String authToken;
    
    @Value("${twilio.fromNumber}")
    private String fromNumber;
    
    /**
     * Sends an SMS notification using Twilio.
     *
     * @param phoneNumber The recipient's phone number.
     * @param message     The SMS message content.
     */
    @Async
    public void sendNotificationSms(String phoneNumber, String message) {
        try {
            // Initialize the Twilio client
            Twilio.init(accountSid, authToken);
            
            // Create and send the SMS message
            Message sms = Message.creator(
                    new PhoneNumber(phoneNumber),  // To number
                    new PhoneNumber(fromNumber),   // From number (Twilio-verified)
                    message
            ).create();
            
            System.out.println("SMS sent successfully to " + phoneNumber + ", SID: " + sms.getSid());
        } catch (Exception e) {
            System.err.println("Error sending SMS to " + phoneNumber + ": " + e.getMessage());
        }
    }
}
