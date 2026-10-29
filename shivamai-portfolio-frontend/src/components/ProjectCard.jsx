
import technologyDocs from '../data/technologyDocs'

function ProjectCard({
  number,
  category,
  title,
  description,
  technologies,
  type,
  repoUrl,
  liveUrl,
}) {
  return (
    <article className="project-card">
      <div className="project-topline">
        <span>
          {number} / {category}
        </span>

        <div className="project-links">
          {liveUrl && (
            <a
              className="project-link"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} live demo`}
            >
              Live Demo ↗
            </a>
          )}

          {repoUrl && (
            <a
              className="project-link"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} repository on GitHub`}
            >
              GitHub ↗
            </a>
          )}

          {!liveUrl && !repoUrl && (
            <span className="project-arrow" aria-hidden="true">
              ↗
            </span>
          )}
        </div>
      </div>
      <h2>{title}</h2>

      <p className="project-description">{description}</p>

      <ul className="project-tech">
        {technologies.map((technology) => {
          const url = technologyDocs[technology]

          return (
            <li key={technology}>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${technology} official documentation (opens in a new tab)`}
                >
                  {technology}
                </a>
              ) : (
                technology
              )}
            </li>
          )
        })}
      </ul>

      <span className="project-status">{type}</span>
    </article>
  )
}

export default ProjectCard
