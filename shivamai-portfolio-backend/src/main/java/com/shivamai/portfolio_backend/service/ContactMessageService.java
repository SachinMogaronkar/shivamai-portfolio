
package com.shivamai.portfolio_backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shivamai.portfolio_backend.dto.ContactRequest;
import com.shivamai.portfolio_backend.entity.ContactMessage;
import com.shivamai.portfolio_backend.repository.ContactMessageRepository;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ContactMessageService {

    private static final Logger log =
            LoggerFactory.getLogger(ContactMessageService.class);

    private static final String BREVO_API_URL =
            "https://api.brevo.com/v3/smtp/email";

    private final ContactMessageRepository contactMessageRepository;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    @Value("${BREVO_API_KEY:}")
    private String brevoApiKey;

    @Value("${BREVO_SENDER_EMAIL:}")
    private String senderEmail;

    @Value("${BREVO_SENDER_NAME:ShivaMai Systems}")
    private String senderName;

    @Value("${CONTACT_RECIPIENT:}")
    private String recipient;

    public ContactMessageService(
            ContactMessageRepository contactMessageRepository,
            ObjectMapper objectMapper) {

        this.contactMessageRepository = contactMessageRepository;
        this.objectMapper = objectMapper;

        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    public ContactMessage saveMessage(ContactRequest request) {

        ContactMessage contactMessage = new ContactMessage();

        contactMessage.setName(request.getName().trim());
        contactMessage.setEmail(request.getEmail().trim());
        contactMessage.setMessage(request.getMessage().trim());

        ContactMessage savedMessage =
                contactMessageRepository.save(contactMessage);

        if (brevoApiKey.isBlank()
                || senderEmail.isBlank()
                || recipient.isBlank()) {

            log.info(
                    "Contact message {} saved; Brevo email is not configured.",
                    savedMessage.getId());

            return savedMessage;
        }

        try {
            sendNotification(savedMessage);
        } catch (Exception exception) {
            log.error(
                    "Brevo email notification failed for submission ID {}",
                    savedMessage.getId(),
                    exception);
        }

        return savedMessage;
    }

    private void sendNotification(ContactMessage contact)
            throws Exception {

        String name = escapeHtml(contact.getName());
        String email = escapeHtml(contact.getEmail());

        String message = escapeHtml(contact.getMessage())
                .replace("\n", "<br>");

        String html = """
                <!DOCTYPE html>
                <html lang="en">
                <head><meta charset="UTF-8"></head>
                <body style="margin:0;padding:24px;background:#0A0A0A;
                             font-family:Arial,Helvetica,sans-serif;color:#F5F5F5;">
                  <table role="presentation" width="100%%" cellspacing="0"
                         cellpadding="0" style="max-width:600px;margin:auto;
                         background:#111111;border:1px solid #333333;">
                    <tr><td style="padding:28px;">
                      <p style="color:#D9A441;letter-spacing:3px;">
                        SHIVAMAI SYSTEMS
                      </p>
                      <h1>New message from %s</h1>
                      <p><strong>Name:</strong> %s</p>
                      <p><strong>Email:</strong>
                        <a style="color:#D9A441;" href="mailto:%s">%s</a>
                      </p>
                      <h3 style="color:#D9A441;">MESSAGE</h3>
                      <div style="padding:18px;background:#0A0A0A;
                                  border-left:3px solid #D9A441;line-height:1.8;">
                        %s
                      </div>
                      <p>Submission reference: #%d</p>
                      <p style="color:#D9A441;">
                        CRAFTSMANSHIP. INTEGRITY. SERVICE.
                      </p>
                    </td></tr>
                  </table>
                </body>
                </html>
                """.formatted(
                name, name, email, email, message, contact.getId());

        String plainText = """
                SHIVAMAI SYSTEMS — NEW PORTFOLIO MESSAGE

                Name: %s
                Email: %s

                Message:
                %s

                Submission reference: #%d
                """.formatted(
                contact.getName(),
                contact.getEmail(),
                contact.getMessage(),
                contact.getId());

        Map<String, Object> payload = Map.of(
                "sender", Map.of(
                        "name", senderName,
                        "email", senderEmail),
                "to", new Object[]{
                        Map.of("email", recipient)
                },
                "replyTo", Map.of(
                        "email", contact.getEmail(),
                        "name", contact.getName()),
                "subject",
                "New Portfolio Contact — " + contact.getName(),
                "htmlContent", html,
                "textContent", plainText
        );

        String jsonPayload = objectMapper.writeValueAsString(payload);

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(BREVO_API_URL))
                .timeout(Duration.ofSeconds(20))
                .header("accept", "application/json")
                .header("api-key", brevoApiKey.trim())
                .header("content-type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

        HttpResponse<String> response = httpClient.send(
                httpRequest,
                HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IllegalStateException(
                    "Brevo API returned HTTP status "
                            + response.statusCode()
                            + " | Response: "
                            + response.body());
        }

        log.info(
                "Brevo email notification accepted for submission ID {}",
                contact.getId());
    }

    private String escapeHtml(String value) {
        return value.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
