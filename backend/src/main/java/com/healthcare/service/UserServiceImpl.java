package com.healthcare.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.entities.User;
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

}
