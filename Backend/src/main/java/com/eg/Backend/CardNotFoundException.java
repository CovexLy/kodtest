package com.eg.Backend;

public class CardNotFoundException extends Exception{
	private static final long serialVersionUID = 1L;
	public CardNotFoundException(String errorMessage) {
		super(errorMessage);
	}
}
