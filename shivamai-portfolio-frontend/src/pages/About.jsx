import signature from '../images/sachin-signature.png'
import '../styles/About.css'

function About() {
  return (
    <main className="about-page">
      <section className="about-heading">
        <div className="about-heading-content">
          <p className="eyebrow">ABOUT / THE ENGINEER</p>

          <h1>
            Curious by Nature.
            <br />
            <span>Engineer by Practice.</span>
          </h1>

          <p className="about-lead">
            I’m interested in how good software comes together—from
            understanding a problem to designing and building a practical,
            reliable solution.
          </p>

          <p className="about-lead">
            My work spans software development, with a focus on backend
            systems, databases, and web technologies. I’m also exploring
            AI integration and how it can make software more useful.
          </p>
        </div>
        <aside className="about-profile">
          <img
            src="src/images/Sachin_Passport.png"
            alt="Sachin Pooja Rajesh Mogaronkar"
            className="about-profile-photo"
          />

          <div className="about-profile-details">
            <h2 className="about-profile-name">
              Sachin Pooja Rajesh Mogaronkar
            </h2>

            <p className="about-profile-role">
              SOFTWARE ENGINEER · BUILDER
            </p>

            <img
              src={signature}
              alt="Sachin's handwritten signature"
              className="about-profile-signature"
            />
          </div>
        </aside>
      </section>

      <section className="about-story">
        <div className="about-label">
          <span>01</span>
          <h2>My approach</h2>
        </div>

        <div className="about-copy">
          <p>
            I enjoy working across backend systems, API design, databases,
            application security, and AI integration. I learn by building,
            testing ideas, and improving how software is structured.
          </p>

          <p>
            Through independent and academic projects, I aim to strengthen
            my engineering fundamentals and create software that is useful,
            understandable, and maintainable.
          </p>
        </div>
      </section>

      <section className="principles-section">
        <p className="eyebrow">WHAT GUIDES THE WORK</p>

        <div className="principles-grid">
          <article className="principle">
            <span>01 / CRAFT</span>
            <h2>Craftsmanship</h2>
            <p>
              Thoughtful implementation, clear structure, and attention
              to the details that make software dependable.
            </p>
          </article>

          <article className="principle">
            <span>02 / TRUST</span>
            <h2>Integrity</h2>
            <p>
              Honest communication, realistic claims, and responsibility
              for the quality of the work.
            </p>
          </article>

          <article className="principle">
            <span>03 / IMPACT</span>
            <h2>Service</h2>
            <p>
              Building with real needs in mind and choosing usefulness
              over unnecessary complexity.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default About
