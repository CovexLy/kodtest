package com.eg.Backend;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
class Card {
	private @Id @GeneratedValue Long id;
	private String name;
	private String surName;
	private String telephone;
	private String email;
	private byte[] image;
	
	Card() {}
	
	Card(String name, String surName, String telephone, String email, byte[] image) {
		this.name = name;
		this.surName = surName;
		this.telephone = telephone;
		this.email = email;
		this.image = image;
	}
}