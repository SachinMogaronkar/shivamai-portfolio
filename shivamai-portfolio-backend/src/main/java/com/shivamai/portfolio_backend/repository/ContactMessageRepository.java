
package com.shivamai.portfolio_backend.repository;

import com.shivamai.portfolio_backend.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository
        extends JpaRepository<ContactMessage, Long> {
}
