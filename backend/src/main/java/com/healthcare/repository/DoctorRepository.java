package com.healthcare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthcare.entities.Doctor;
import com.healthcare.entities.User;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByUser(User user);

    List<Doctor> findBySpecialization(String specialization);

    List<Doctor> findByQualification(String qualification);

    List<Doctor> findByExperienceYears(int experienceYears);

    List<Doctor> findByClinicAddress(String clinicAddress);

    List<Doctor> findByAvailableDays(String availableDays);

    // Use JPQL to fetch a Doctor by the associated User ID
    @Query("SELECT d FROM Doctor d WHERE d.user.id = :userId")
    Optional<Doctor> findByUserId(@Param("userId") Long userId);

}