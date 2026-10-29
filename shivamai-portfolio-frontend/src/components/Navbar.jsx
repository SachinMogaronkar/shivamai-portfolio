
import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/">
        <span className="brand-name">SACHIN POOJA RAJESH MOGARONKAR</span>
        <span className="brand-role">ENGINEER / BUILDER</span>
      </NavLink>


      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/experience">Experience</NavLink>
        <NavLink to="/skills">Skills</NavLink>
        <NavLink to="/resume">Resume</NavLink>
        <NavLink className="contact-link" to="/contact">
          Contact <span aria-hidden="true">↗</span>
        </NavLink>
      </nav>

    </header>
  )
}

export default Navbar
