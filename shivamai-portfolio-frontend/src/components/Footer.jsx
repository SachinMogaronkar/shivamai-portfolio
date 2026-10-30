
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-name">
            SACHIN MOGARONKAR
          </Link>
          <p>Engineer / Builder</p>
          <p className="footer-note">
            Building useful software with care and purpose.
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/leetcode">LeetCode</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer-socials">
          <a
            href="https://github.com/SachinMogaronkar"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/sachin-mogaronkar3117"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a href="mailto:sachinmogaronkar@gmail.com">
            Email ↗
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Sachin Mogaronkar</span>
        <span>Powered by ShivaMai Systems</span>
      </div>
    </footer>
  )
}

export default Footer
