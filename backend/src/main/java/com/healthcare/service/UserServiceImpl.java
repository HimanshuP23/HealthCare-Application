package com.healthcare.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.entities.Role;
import com.healthcare.entities.User;
import com.healthcare.exceptions.ResourceNotFoundException;
import com.healthcare.repository.UserRepository;


@Service
@Transactional
public class UserServiceImpl implements UserService {

	//dep : dao layer i/f
			@Autowired
			private UserRepository userRepository;
			//dep
			@Autowired
			private ModelMapper mapper;
			//dep 
			@Autowired
			private PasswordEncoder encoder;
		@Override
		public User userRegistration(User usr) {
			//dto --> entity
//			User user=mapper.map(reqDTO, UserEntity.class);
//			if(userRepository.existsByEmail(usr.getEmail()))
//				throw new ApiException("Email already exists !!!");
//			
			usr.setPassword(encoder.encode(usr.getPassword()));//pwd : encrypted using SHA
			return userRepository.save(usr);
		}
		
		public List<User> getAllUsers() {
	        return userRepository.findAll();
	    }

	    public User getUserById(Long id) {
	        return userRepository.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
	    }

	    public User updateUser(Long id, User updatedUser) {
	        User existingUser = getUserById(id);

	        existingUser.setName(updatedUser.getName());
	        existingUser.setEmail(updatedUser.getEmail());
	        existingUser.setPassword(encoder.encode(updatedUser.getPassword()));
	        existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
	        existingUser.setRole(updatedUser.getRole());

	        return userRepository.save(existingUser);
	    }

	    public void deleteUser(Long id) {
	        User user = getUserById(id);
	        userRepository.delete(user);
	    }	
	    
	 // In UserService.java
	    public List<User> getUsersByRole(Role role) {
	        return userRepository.findByRole(role); // Assuming you're using a repository method to find users by role
	    }

}
