
package com.shivamai.portfolio_backend.controller;

import com.shivamai.portfolio_backend.dto.ContactRequest;
import com.shivamai.portfolio_backend.entity.ContactMessage;
import com.shivamai.portfolio_backend.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageService contactMessageService;

    public ContactController(
            ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContact(
            @Valid @RequestBody ContactRequest request) {

        ContactMessage savedMessage =
                contactMessageService.saveMessage(request);

        Map<String, Object> response = Map.of(
                "success", true,
                "message", "Your message has been received successfully.",
                "id", savedMessage.getId()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
