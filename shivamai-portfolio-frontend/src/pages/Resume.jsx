import resume from '/documents/Sachin_Mogaronkar_Java_Backend_Developer_Resume.pdf'
import photo from '/documents/Sachin_Passport.png'
import '../styles/Resume.css'

function Resume() {
  return (
    <main className="resume-page">
      <section className="resume-heading">
        <p className="eyebrow">RESUME / DOCUMENTS</p>

        <h1>
          Professional
          <br />
          <span>Documents.</span>
        </h1>

        <p>
          Explore my professional background and download my resume
          or passport-style photograph.
        </p>
      </section>

      <section className="documents-grid">
        <article className="document-card">
          <p className="eyebrow">01 / PROFESSIONAL PROFILE</p>
          <h2>Resume</h2>
          <p>
            Explore my technical skills, education, projects, and software
            development experience.
          </p>

          <div className="document-actions">
            <a
              className="document-link"
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              View resume <span aria-hidden="true">↗</span>
            </a>

            <a
              className="document-link"
              href={resume}
              download="Sachin_Mogaronkar_Java_Backend_Developer_Resume.pdf"
            >
              Download PDF <span aria-hidden="true">↓</span>
            </a>
          </div>
        </article>

        <article className="document-card">
          <p className="eyebrow">02 / PROFILE PHOTOGRAPH</p>
          <h2>Passport Photo</h2>
          <p>
            View or download my professional passport-style photograph.
          </p>

          <div className="document-actions">
            <a
              className="document-link"
              href={photo}
              target="_blank"
              rel="noopener noreferrer"
            >
              View photograph <span aria-hidden="true">↗</span>
            </a>

            <a
              className="document-link"
              href={photo}
              download="Sachin_Passport.png"
            >
              Download PNG <span aria-hidden="true">↓</span>
            </a>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Resume
