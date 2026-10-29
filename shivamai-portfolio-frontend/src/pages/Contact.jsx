
import { useState } from 'react'
import '../styles/Contact.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setFieldErrors((previous) => ({
      ...previous,
      [name]: '',
    }))

    setStatus(null)
  }


  async function handleSubmit(event) {
    event.preventDefault()

    if (loading) return

    const errors = {}
    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()

    if (!name) {
      errors.name = 'Please enter your name.'
    } else if (name.length > 100) {
      errors.name = 'Name must not exceed 100 characters.'
    }

    if (!email) {
      errors.email = 'Please enter your email address.'
    } else if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.split('@')[0].length > 64 ||
      email.split('@')[1]?.length > 253
    ) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!message) {
      errors.message = 'Please enter a message.'
    } else if (message.length < 10) {
      errors.message = 'Your message must contain at least 10 characters.'
    } else if (message.length > 3000) {
      errors.message = 'Your message must not exceed 3000 characters.'
    }

    setFieldErrors(errors)
    setStatus(null)

    if (Object.keys(errors).length > 0) {
      return
    }

    setLoading(true)

    setStatus(null)
    setFieldErrors({})

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.errors) {
          setFieldErrors(result.errors)
        }

        throw new Error(
          result.message || 'Unable to send your message. Please try again.',
        )
      }

      if (result.success !== true) {
        throw new Error('The server did not confirm your submission.')
      }

      setFormData({
        name: '',
        email: '',
        message: '',
      })

      setStatus({
        type: 'success',
        message: 'Message received. Thank you for reaching out.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof TypeError
            ? 'Unable to connect to the server. Please try again shortly.'
            : error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="contact-page">
      <section className="contact-heading">
        <p className="eyebrow">CONTACT / START A CONVERSATION</p>

        <h1>
          Have something
          <br />
          <span>worth building?</span>
        </h1>

        <p>
          I'm open to software development opportunities, meaningful
          engineering challenges, and conversations about useful software.
        </p>
      </section>

      <section className="contact-layout">
        <div className="contact-details">
          <p className="eyebrow">GET IN TOUCH</p>

          <a
            className="contact-item"
            href="mailto:sachinmogaronkar@gmail.com"
          >
            <span className="contact-label">EMAIL</span>
            <span className="contact-value">
              sachinmogaronkar@gmail.com ↗
            </span>
          </a>

          <a
            className="contact-item"
            href="https://github.com/SachinMogaronkar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-label">GITHUB</span>
            <span className="contact-value">
              Explore my repositories ↗
            </span>
          </a>

          <a
            className="contact-item"
            href="https://linkedin.com/in/sachin-mogaronkar3117"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-label">LINKEDIN</span>
            <span className="contact-value">
              Connect professionally ↗
            </span>
          </a>
        </div>

        <div className="contact-form-panel">
          <p className="eyebrow">MESSAGE FORM</p>

          <h2>Let's talk.</h2>

          <p className="form-notice">
            Send a message directly through the ShivaMai Portfolio.
            I'll get back to you as soon as possible.
          </p>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              maxLength={100}
              autoComplete="name"
              required
              disabled={loading}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            />
            {fieldErrors.name && (
              <p className="form-field-error" id="name-error">
                {fieldErrors.name}
              </p>
            )}

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              maxLength={254}
              autoComplete="email"
              required
              disabled={loading}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            />
            {fieldErrors.email && (
              <p className="form-field-error" id="email-error">
                {fieldErrors.email}
              </p>
            )}

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Tell me a little about your idea..."
              value={formData.message}
              onChange={handleChange}
              minLength={10}
              maxLength={3000}
              required
              disabled={loading}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={
                fieldErrors.message ? 'message-error' : undefined
              }
            />
            {fieldErrors.message && (
              <p className="form-field-error" id="message-error">
                {fieldErrors.message}
              </p>
            )}

            {status && (
              <p
                className={`form-status form-status--${status.type}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? 'Sending message...' : 'Send message'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Contact
