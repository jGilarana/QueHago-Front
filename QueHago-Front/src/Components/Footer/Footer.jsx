import React from 'react';
import './Footer.css';  // Asegúrate de tener un archivo CSS para tus estilos

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Sección 1</h2>
          <p>Contenido de la sección 1.</p>
        </div>
        <div className="footer-section">
          <h2>Sección 2</h2>
          <p>Contenido de la sección 2.</p>
        </div>
        <div className="footer-section">
          <h2>Sección 3</h2>
          <p>Contenido de la sección 3.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Tu Sitio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
