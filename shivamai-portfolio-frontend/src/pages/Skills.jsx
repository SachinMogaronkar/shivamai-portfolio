import technologyDocs from '../data/technologyDocs'
import '../styles/Skills.css'

const skillGroups = [
  {
    number: '01',
    title: 'Backend Development',
    description: 'Building application logic and server-side systems.',
    skills: [
      'Java',
      'Spring Boot',
      'Spring MVC',
      'Spring Security',
      'REST APIs',
      'JDBC',
      'Hibernate',
      'Spring Data JPA',
    ],
  },
  {
    number: '02',
    title: 'Databases',
    description: 'Working with relational and document databases.',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL'],
  },
  {
    number: '03',
    title: 'AI Integration',
    description: 'Exploring AI capabilities in software applications.',
    skills: ['Spring AI', 'OpenAI API Integration'],
  },
  {
    number: '04',
    title: 'Frontend Development',
    description: 'Building interfaces and web application fundamentals.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React'],
  },
  {
    number: '05',
    title: 'Developer Tools',
    description: 'Tools for development, testing, and collaboration.',
    skills: [
      'Git',
      'GitHub',
      'Maven',
      'Postman',
      'Swagger',
      'OpenAPI',
      'Docker',
    ],
  },
  {
    number: '06',
    title: 'Engineering Foundations',
    description: 'Core concepts used to design and maintain software.',
    skills: [
      'Object-Oriented Programming',
      'Collections',
      'Exception Handling',
      'JWT Authentication',
      'Layered Architecture',
      'API Validation',
    ],
  },
]

function Skills() {
  return (
    <main className="skills-page">
      <section className="skills-heading">
        <p className="eyebrow">SKILLS / TECHNICAL TOOLKIT</p>

        <h1>
          Tools are Useful.
          <br />
          <span>Fundamentals Matter.</span>
        </h1>

        <p>
          A growing toolkit across backend engineering, databases,
          AI integration, and web development.
        </p>
      </section>

      <section className="skills-grid" aria-label="Technical skills">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.number}>
            <div className="skill-card-top">
              <span>{group.number}</span>
              <span aria-hidden="true">↗</span>
            </div>

            <h2>{group.title}</h2>
            <p>{group.description}</p>


            <ul className="skill-list">
              {group.skills.map((skill) => {
                const url = technologyDocs[skill]

                return (
                  <li key={skill}>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${skill} documentation (opens in a new tab)`}
                      >
                        {skill}
                      </a>
                    ) : (
                      skill
                    )}
                  </li>
                )
              })}
            </ul>

          </article>
        ))}
      </section>

      <p className="skills-note">
        Technologies listed reflect my current learning and project
        experience. I continue to develop my skills through hands-on work.
      </p>
    </main>
  )
}

export default Skills
