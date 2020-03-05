package com.eg.Backend;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardController {
	private final CardRepository repository;
	
	public CardController(CardRepository repository){
		this.repository = repository;
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/cards")
	List<Card> all() {
		return repository.findAll();
	}

	@CrossOrigin(origins = "*")
	@PostMapping("/cards")
	Card newCard(@RequestBody Card newCard){
		System.out.println(newCard);
		return repository.save(newCard);
	}

	@CrossOrigin(origins = "*")
	@GetMapping("/cards/{id}")
	Card one(@PathVariable Long id) throws CardNotFoundException{
		return repository.findById(id).orElseThrow(()-> new CardNotFoundException(id.toString()));
	}

	@CrossOrigin(origins = "*")
	@PutMapping("/cards/{id}")
	Card replaceCard(@RequestBody Card newCard, @PathVariable Long id) {
		return repository.findById(id)
			.map(card -> {
				card.setName(newCard.getName());
				card.setSurName(newCard.getSurName());
				card.setTelephone(newCard.getTelephone());
				card.setEmail(newCard.getEmail());
				card.setImage(newCard.getImage());
				return repository.save(card);
			})
			.orElseGet(() -> {
				newCard.setId(id);
				return repository.save(newCard);
		});
	}

	@CrossOrigin(origins = "*")
	@DeleteMapping("/cards/{id}")
	void deleteCard(@PathVariable Long id){
		repository.deleteById(id);
	}
}
