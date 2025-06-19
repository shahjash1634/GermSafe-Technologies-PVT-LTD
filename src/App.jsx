import React from 'react';
import './App.css';
import GermBackground from './components/germBackground';


function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">GermSafe Tech</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#technology">Technology</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section with Germs and Sword */}
      <header className="hero">
        <GermBackground />

        <div className="hero-content">
          <h1>Revolutionizing Emulsion Stability 🚀</h1>
          <p>
            GermSafe Technologies Pvt. Ltd. manufactures and trades cutting-edge emulsion stabilizing machines with patented tech.
          </p>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="section fade-in">
        <h2>About Us</h2>
        <p>
          GermSafe Technologies is a Mumbai-based startup focused on innovative solutions to enhance emulsion stability and reduce particle size.
          With a deep R&D-driven approach and proprietary technology, we are setting new standards in the chemical equipment space.
        </p>
      </section>

      {/* Products Section */}
      <section id="products" className="section fade-in">
        <h2>Our Products</h2>
        <div className="product-card">
          <h3>Stabilizing Machine A</h3>
          <p>Efficient for micro-scale production with adjustable RPM and digital interface.</p>
        </div>
        <div className="product-card">
          <h3>Pilot Model B</h3>
          <p>For pilot-scale trials in lab setups, offering emulsion testing capabilities.</p>
        </div>
        <div className="product-card">
          <h3>Industrial Unit C</h3>
          <p>Scalable for high-volume production lines with safety and automation features.</p>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="section fade-in">
        <h2>Our Technology</h2>
        <p>
          Using patent-approved methods, our systems enhance mixing efficiency, increase product shelf-life, and ensure consistency in manufacturing environments.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section fade-in contact-section">
        <h2>Contact Us</h2>
        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 GermSafe Technologies Pvt. Ltd.
      </footer>
    </div>
  );
}

export default App;
