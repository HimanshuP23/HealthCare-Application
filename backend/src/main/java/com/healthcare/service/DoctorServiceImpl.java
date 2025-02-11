package com.healthcare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.entities.Doctor;
import com.healthcare.entities.Role;
import com.healthcare.entities.User;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.UserRepository;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {
	
	@Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

	@Override
	public Doctor getDoctorDetails(Long doctorId) {
		// TODO Auto-generated method stub
		return doctorRepository.findById(doctorId).orElseThrow();
	}

	@Override
	public List<Doctor> getAllDoctors() {
		// TODO Auto-generated method stub
		System.out.println(doctorRepository.findAll());
		return doctorRepository.findAll();
	}

	@Override
	public Doctor createDoctor(Doctor doctor, Long userId) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    User currentUser = userRepository.findByEmail(authentication.getName()).orElseThrow();
	    
	    if (currentUser.getRole() != Role.DOCTOR && currentUser.getRole() != Role.ADMIN) {
	        throw new RuntimeException("Only doctors and admins can create doctors");
	    }
	    
	    // Retrieve the user based on the userId
	    User user = userRepository.findById(userId).orElseThrow();

	    // Set the user in the doctor object
	    doctor.setUser(user);

	    return doctorRepository.save(doctor);
	}
	
	@Override
	public Doctor updateDoctor(Long doctorId, Doctor updatedDoctor) {
		Doctor existingDoctor = doctorRepository.findById(doctorId).orElseThrow();

        // Check if the current user is the doctor being updated or an admin
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(authentication.getName()).orElseThrow();
        if (!currentUser.getEmail().equals(existingDoctor.getUser().getEmail()) && currentUser.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only the doctor being updated or an admin can update a doctor");
        }

        existingDoctor.setSpecialization(updatedDoctor.getSpecialization());
        existingDoctor.setQualification(updatedDoctor.getQualification());
        existingDoctor.setExperienceYears(updatedDoctor.getExperienceYears());
        existingDoctor.setClinicAddress(updatedDoctor.getClinicAddress());
        existingDoctor.setConsultationFee(updatedDoctor.getConsultationFee());
        existingDoctor.setAvailableDays(updatedDoctor.getAvailableDays());
        existingDoctor.setAvailableTimeStart(updatedDoctor.getAvailableTimeStart());
        existingDoctor.setAvailableTimeEnd(updatedDoctor.getAvailableTimeEnd());

        return doctorRepository.save(existingDoctor);
	}

	@Override
	public void deleteDoctor(Long doctorId) {
		// Check if the current user is an admin
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(authentication.getName()).orElseThrow();
        if (currentUser.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only admins can delete doctors");
        }

        doctorRepository.deleteById(doctorId);
	}
	
	@Override
	public List<Doctor> getDoctorsBySpecialization(String specialization) {
	    return doctorRepository.findBySpecialization(specialization);
	}

	@Override
	public List<Doctor> getDoctorsByQualification(String qualification) {
	    return doctorRepository.findByQualification(qualification);
	}

	@Override
	public List<Doctor> getDoctorsByExperienceYears(int experienceYears) {
	    return doctorRepository.findByExperienceYears(experienceYears);
	}

	@Override
	public List<Doctor> getDoctorsByClinicAddress(String clinicAddress) {
	    return doctorRepository.findByClinicAddress(clinicAddress);
	}

	@Override
	public List<Doctor> getDoctorsByAvailableDays(String availableDays) {
	    return doctorRepository.findByAvailableDays(availableDays);
	}

	@Override
	public long getDoctorCounts() {
		return doctorRepository.getDoctorCount();
	}
	

}
