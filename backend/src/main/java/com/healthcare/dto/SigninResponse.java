package com.healthcare.dto;

import com.healthcare.entities.Doctor;
import com.healthcare.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class SigninResponse {
    private String jwt;
    private String mesg;
    private String role; // Add role to the response
    private Long userId;
    private Doctor doctorDetails;
    private User user;
    
    public SigninResponse(String jwt, String mesg, String role, Long userId, User user) {
        this.jwt = jwt;
        this.mesg = mesg;
        this.role = role;
        this.userId = userId;
        this.user = user;
    }
    public SigninResponse(String jwt, String mesg, String role, Long userId,Doctor doctorDetails,User user) {
        this.jwt = jwt;
        this.mesg = mesg;
        this.role = role;
        this.userId = userId;
        this.doctorDetails = doctorDetails;
        this.user = user;
    }
}
