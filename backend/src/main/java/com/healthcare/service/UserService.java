package com.healthcare.service;

import java.util.List;

import com.healthcare.entities.Role;
import com.healthcare.entities.User;

public interface UserService {
	User userRegistration(User u);
	
	List<User> getAllUsers();
	
	User getUserById(Long id);
	
	User updateUser(Long id, User updatedUser);
	
	void deleteUser(Long id);
	
	List<User> getUsersByRole(Role role);

	long getPatientCounts();
	
	
}
