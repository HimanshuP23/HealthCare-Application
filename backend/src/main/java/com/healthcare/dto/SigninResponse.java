package com.healthcare.dto;

import com.healthcare.entities.Doctor;

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
    
    public SigninResponse(String jwt, String mesg, String role, Long userId) {
        this.jwt = jwt;
        this.mesg = mesg;
        this.role = role;
        this.userId = userId;
    }
    public SigninResponse(String jwt, String mesg, String role, Long userId,Doctor doctorDetails) {
        this.jwt = jwt;
        this.mesg = mesg;
        this.role = role;
        this.userId = userId;
        this.doctorDetails = doctorDetails;
    }
}
