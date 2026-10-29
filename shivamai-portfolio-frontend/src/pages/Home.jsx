
import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">
            SOFTWARE ENGINEERING · BACKEND · AI INTEGRATION
          </p>

          <h1>
            Software
            <br />
            <span>Developer.</span>
          </h1>


          <p className="hero-description">
            Building practical, reliable software, practical backend systems,
            and useful AI integration tools that solve real problems.
          </p>

          <div className="hero-actions">
            <Link className="button-primary" to="/projects">
              Explore Projects <span aria-hidden="true">↘</span>
            </Link>

            <Link className="button-secondary" to="/contact">
              Get in Touch <span aria-hidden="true">↗</span>
            </Link>
          </div>

        </div>

        <div className="hero-visual">
          <div className="hero-orbit" aria-hidden="true">
            <div className="hero-orbit-inner">
              <span>BUILD</span>
              <span>WITH</span>
              <span>PURPOSE.</span>
            </div>
            <span className="orbit-dot"></span>
          </div>

          <p className="visual-caption">
            CRAFTSMANSHIP · INTEGRITY · SERVICE
          </p>
        </div>

      </section>

      <section className="home-intro">
        <p className="eyebrow">A PRACTICAL ENGINEERING MINDSET</p>
        <h2>Thoughtful code. Useful software.</h2>
        <p>
          I explore backend engineering, API design, database systems,
          and AI integration through hands-on software projects.
        </p>
      </section>
    </main>
  )
}

export default Home
