package com.healthcare;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EntityScan(basePackages = "com.healthcare.entities")
@EnableAsync
public class BackendApplication {
	
	
	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load(); // Load .env variables
	    System.setProperty("DATASOURCE_URL", dotenv.get("DATASOURCE_URL"));
	    System.setProperty("DATASOURCE_USER", dotenv.get("DATASOURCE_USER"));
	    System.setProperty("DATASOURCE_PASSWORD", dotenv.get("DATASOURCE_PASSWORD"));
	    System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));
	    System.setProperty("MAIL_USERNAME", dotenv.get("MAIL_USERNAME"));
	    System.setProperty("MAIL_PASSWORD", dotenv.get("MAIL_PASSWORD"));
	    System.setProperty("STRIPE_SECRET_KEY", dotenv.get("STRIPE_SECRET_KEY"));
	    System.setProperty("FRONTEND_URL", dotenv.get("FRONTEND_URL"));
		
		SpringApplication.run(BackendApplication.class, args);
		
		
	}
	
	@Bean // equivalent to <bean id ..../> in xml file
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration()
		.setMatchingStrategy(MatchingStrategies.STRICT) // only MATCHING prop names
																						// between src n dest will be
																						// transferred , during the
																						// mapping
				.setPropertyCondition(Conditions.isNotNull());// only non null properties will be transferred from src
																// --> dest , during the mapping
		return modelMapper;

	}
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}

}
