package com.eg.Backend;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
class LoadDatabase {

  @Bean
  CommandLineRunner initDatabase(CardRepository repository) {
    return args -> {
    	log.info("Preloading " + repository.save(new Card("John", "Mclaine", "555-0145", "john.mclaine@nypd.gov", "".getBytes())));
        log.info("Preloading " + repository.save(new Card("Mary", "Poppins", "196-40823", "m.poppins@disney.com", "".getBytes())));
    };
  }
}