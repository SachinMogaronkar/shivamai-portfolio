
package com.shivamai.portfolio_backend.service;

import com.shivamai.portfolio_backend.dto.ContactRequest;
import com.shivamai.portfolio_backend.entity.ContactMessage;
import com.shivamai.portfolio_backend.repository.ContactMessageRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.UnsupportedEncodingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

@Service
public class ContactMessageService {

    private static final Logger log =
            LoggerFactory.getLogger(ContactMessageService.class);

    private final ContactMessageRepository contactMessageRepository;
    private final JavaMailSender mailSender;

    @Value("${app.contact.recipient:}")
    private String recipient;

    @Value("${spring.mail.username:}")
    private String sender;

    public ContactMessageService(
            ContactMessageRepository contactMessageRepository,
            @Nullable JavaMailSender mailSender) {
        this.contactMessageRepository = contactMessageRepository;
        this.mailSender = mailSender;
    }

    public ContactMessage saveMessage(ContactRequest request) {
        ContactMessage contactMessage = new ContactMessage();

        contactMessage.setName(request.getName().trim());
        contactMessage.setEmail(request.getEmail().trim());
        contactMessage.setMessage(request.getMessage().trim());

        ContactMessage savedMessage =
                contactMessageRepository.save(contactMessage);

        if (mailSender == null || recipient.isBlank() || sender.isBlank()) {
            log.info(
                    "Contact message {} saved; email notification is not configured.",
                    savedMessage.getId());
            return savedMessage;
        }

        try {
            sendNotification(savedMessage);
        } catch (MailException | MessagingException
                 | UnsupportedEncodingException exception) {
            log.error(
                    "Email notification failed for submission ID {}",
                    savedMessage.getId(),
                    exception);
        }

        return savedMessage;
    }

    private void sendNotification(ContactMessage contact)
            throws MessagingException, UnsupportedEncodingException {

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

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper =
                new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setFrom(sender, "ShivaMai Systems");
        helper.setTo(recipient);
        helper.setReplyTo(contact.getEmail());
        helper.setSubject(
                "New Portfolio Contact — " + contact.getName());
        helper.setText(plainText, html);

        mailSender.send(mimeMessage);
    }

    private String escapeHtml(String value) {
        return value.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
