
import ProjectCard from '../components/ProjectCard'
import '../styles/Projects.css'

const projects = [
  {
    number: '01',
    category: 'AI ENGINEERING',
    title: 'ShivaMai AI TestPilot',
    description:
      'An AI-powered API testing assistant exploring test generation and software quality workflows.',
    technologies: ['Java', 'Spring Boot', 'Spring AI', 'REST APIs'],
    type: 'INDEPENDENT PROJECT',
    repoUrl: 'null',
    liveUrl: 'null'
  },
  {
    number: '02',
    category: 'API SECURITY',
    title: 'ShivaMai OTP Service',
    description:
      'A backend project focused on OTP-based verification, authentication flows, and API design.',
    technologies: ['Spring Boot', 'Spring Security', 'JWT', 'MySQL'],
    type: 'INDEPENDENT PROJECT',
    repoUrl: 'null',
    liveUrl: 'null'
  },
  {
    number: '03',
    category: 'WEB APPLICATION',
    title: 'NASA APOD Vault',
    description:
      "A web application integrating NASA's Astronomy Picture of the Day API, with backend services for API communication, data handling, and security.",
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'JavaScript',
    ],
    type: 'INTERNSHIP PROJECT',
    repoUrl: 'https://github.com/SachinMogaronkar/nasa-apod-vault',
    liveUrl: 'https://nasa-apod-vault.pages.dev/',
  },
  {
    number: '04',
    category: 'DESKTOP APPLICATION',
    title: 'Fibernet Billing Software',
    description:
      'A Java desktop billing application for managing customer records and billing workflows, using JDBC and Hibernate for database connectivity and persistence.',
    technologies: [
      'Java',
      'Swing',
      'JDBC',
      'Hibernate',
      'MySQL',
    ],
    type: 'ACADEMIC PROJECT',
    repoUrl: 'null',
    liveUrl: 'null'
  },

  {
    number: '05',
    category: 'MOBILE & BACKEND SYSTEMS',
    title: 'EmerGuard – Roadway Assistance Application',
    description:
      'A roadside assistance application connecting users with nearby services through location-based SOS and emergency workflows. Developed backend services for authentication, request management, validation, structured API responses, and MongoDB integration.',
    technologies: [
      'Spring Boot',
      'MongoDB',
      'REST APIs',
      'React Native',
    ],
    type: 'ACADEMIC PROJECT',
    repoUrl: 'null',
    liveUrl: 'null'
  },
]

function Projects() {
  return (
    <main className="projects-page">
      <section className="projects-heading">
        <p className="eyebrow">SELECTED WORK / 2024—2026</p>
        <h1>Projects that
          <br />
          <span>Solve Problems.</span>
        </h1>
        <p>
          Independent and academic work exploring backend engineering,
          API security, databases, and AI-powered software.
        </p>
      </section>

      <section className="projects-grid" aria-label="Portfolio projects">
        {projects.map((project) => (
          <ProjectCard key={project.number} {...project} />
        ))}
      </section>
    </main>
  )
}

export default Projects
