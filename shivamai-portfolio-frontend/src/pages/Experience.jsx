import technologyDocs from '../data/technologyDocs'
import '../styles/Experience.css'

function Experience() {
  return (
    <main className="experience-page">
      <section className="experience-heading">
        <p className="eyebrow">EXPERIENCE / PROFESSIONAL JOURNEY</p>
        <h1>
          Learning.
          <br />
          <span>Building. Improving.</span>
        </h1>
        <p>
          My professional journey in software development, shaped by
          hands-on learning, application development, and continuous
          improvement.
        </p>
      </section>


      <section className="experience-timeline">
        <article className="experience-entry">
          <div className="experience-marker">
            <span>01</span>
          </div>
        <div className="experience-details">
          <div className="experience-meta">
            <span>SOFTWARE DEVELOPMENT INTERNSHIP</span>
            <span>INTERNSHIP PROJECTS</span>
          </div>

          <h2>Software Developer Intern</h2>
          <h3>QSpiders — Robowave Innovation</h3>

          <p className="experience-date">
            December 2024 – June 2025
          </p>

          <p className="experience-summary">
            Contributed to software development projects using Java,
            backend technologies, REST APIs, and relational databases,
            while strengthening practical development and debugging skills.
          </p>

          <ul className="experience-points">
            <li>
              Applied Java and object-oriented programming concepts
              while developing application features.
            </li>
            <li>
              Worked with REST APIs and database integration using
              Java backend technologies.
            </li>
            <li>
              Practised debugging, API testing, and structured code
              development across project workflows.
            </li>
          </ul>

          <div className="experience-tech">
            {['Java', 'Spring Boot', 'SQL', 'REST APIs'].map((technology) => {
              const url = technologyDocs[technology]

              return url ? (
                <a
                  key={technology}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${technology} documentation (opens in a new tab)`}
                >
                  {technology}
                </a>
              ) : (
                <span key={technology}>{technology}</span>
              )
            })}
          </div>
        </div>
        </article>
      </section>
    </main>
  )
}

export default Experience
