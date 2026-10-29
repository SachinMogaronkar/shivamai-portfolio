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
import org.springframework.stereotype.Service;

@Service
public class ContactMessageService {

    private static final Logger log = LoggerFactory.getLogger(ContactMessageService.class);

    private final ContactMessageRepository contactMessageRepository;
    private final JavaMailSender mailSender;

    @Value("${app.contact.recipient}")
    private String recipient;

    @Value("${spring.mail.username}")
    private String sender;

    public ContactMessageService(ContactMessageRepository contactMessageRepository, JavaMailSender mailSender) {
        this.contactMessageRepository = contactMessageRepository;
        this.mailSender = mailSender;
    }

    public ContactMessage saveMessage(ContactRequest request) {
        ContactMessage contactMessage = new ContactMessage();

        contactMessage.setName(request.getName().trim());
        contactMessage.setEmail(request.getEmail().trim());
        contactMessage.setMessage(request.getMessage().trim());

        ContactMessage savedMessage = contactMessageRepository.save(contactMessage);

        try {
            sendNotification(savedMessage);
        } catch (MailException | MessagingException | UnsupportedEncodingException exception) {
            log.error("Email notification failed for submission ID {}", savedMessage.getId(), exception);
        }

        return savedMessage;
    }

    private void sendNotification(ContactMessage contact) throws MessagingException, UnsupportedEncodingException {
        {

            String name = escapeHtml(contact.getName());
            String email = escapeHtml(contact.getEmail());
            String message = escapeHtml(contact.getMessage()).replace("\n", "<br>");

            String html = """
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8">
                      <meta name="viewport"
                            content="width=device-width, initial-scale=1.0">
                    </head>
                    <body style="margin:0;padding:0;background:#0A0A0A;
                                 font-family:Arial,Helvetica,sans-serif;
                                 color:#F5F5F5;">

                      <div style="display:none;max-height:0;overflow:hidden;">
                        A new message has arrived through your ShivaMai Portfolio.
                      </div>

                      <table role="presentation" width="100%%"
                             cellspacing="0" cellpadding="0"
                             style="background:#0A0A0A;padding:32px 12px;">
                        <tr>
                          <td align="center">
                            <table role="presentation" width="100%%"
                                   cellspacing="0" cellpadding="0"
                                   style="max-width:600px;background:#111111;
                                          border:1px solid #333333;">

                              <tr>
                                <td style="padding:30px 28px 24px;
                                           border-bottom:1px solid #333333;">
                                  <p style="margin:0 0 8px;color:#D9A441;
                                            font-size:11px;letter-spacing:3px;
                                            font-weight:bold;">
                                    SHIVAMAI SYSTEMS
                                  </p>
                                  <h1 style="margin:0;color:#F5F5F5;
                                                 font-size:25px;font-weight:600;
                                                 line-height:1.3;">
                                        New message from %s
                                  </h1>
                                </td>
                              </tr>

                              <tr>
                                <td style="padding:28px;">
                                  <p style="margin:0 0 18px;color:#D9A441;
                                            font-size:11px;letter-spacing:2px;
                                            font-weight:bold;">
                                    CONTACT DETAILS
                                  </p>

                                  <p style="margin:0 0 6px;color:#A3A3A3;
                                            font-size:12px;">NAME</p>
                                  <p style="margin:0 0 20px;color:#F5F5F5;
                                            font-size:16px;line-height:1.5;">
                                    %s
                                  </p>

                                  <p style="margin:0 0 6px;color:#A3A3A3;
                                            font-size:12px;">EMAIL ADDRESS</p>
                                  <p style="margin:0 0 24px;font-size:15px;
                                            line-height:1.5;overflow-wrap:anywhere;">
                                    <a href="mailto:%s"
                                       style="color:#D9A441;text-decoration:none;">
                                      %s
                                    </a>
                                  </p>

                                  <div style="height:1px;background:#333333;
                                              margin-bottom:24px;"></div>

                                  <p style="margin:0 0 12px;color:#D9A441;
                                            font-size:11px;letter-spacing:2px;
                                            font-weight:bold;">
                                    MESSAGE
                                  </p>

                                  <div style="background:#0A0A0A;
                                              border:1px solid #333333;
                                              border-left:3px solid #D9A441;
                                              padding:20px;color:#F5F5F5;
                                              font-size:14px;line-height:1.8;
                                              overflow-wrap:anywhere;">
                                    %s
                                  </div>

                                  <p style="margin:24px 0 0;color:#A3A3A3;
                                            font-size:12px;">
                                    Submission reference:
                                    <span style="color:#F5F5F5;">#%d</span>
                                  </p>
                                </td>
                              </tr>

                              <tr>
                                <td style="padding:22px 28px;
                                           border-top:1px solid #333333;">
                                  <p style="margin:0 0 8px;color:#D9A441;
                                            font-size:11px;letter-spacing:2px;
                                            font-weight:bold;">
                                    CRAFTSMANSHIP. INTEGRITY. SERVICE.
                                  </p>
                                  <p style="margin:0;color:#777777;
                                            font-size:11px;line-height:1.7;">
                                    Automated notification from your
                                    ShivaMai Portfolio contact form.
                                  </p>
                                </td>
                              </tr>

                            </table>
                          </td>
                        </tr>
                      </table>
                    </body>
                    </html>
                    """.formatted(name, name, email, email, message, contact.getId());

            String plainText = """
                    SHIVAMAI SYSTEMS — NEW PORTFOLIO MESSAGE

                    Name: %s
                    Email: %s

                    Message:
                    %s

                    Submission reference: #%d
                    """.formatted(contact.getName(), contact.getEmail(), contact.getMessage(), contact.getId());

            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(sender, "ShivaMai Systems");
            helper.setTo(recipient);
            helper.setReplyTo(contact.getEmail());
            helper.setSubject("New Portfolio Contact — " + contact.getName());
            helper.setText(plainText, html);

            mailSender.send(mimeMessage);
        }
    }

    private String escapeHtml(String value) {
        return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;").replace("'", "&#39;");
    }
}
