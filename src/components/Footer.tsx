import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

interface FooterProps {
  onOpenTutorial: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenTutorial }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-40 py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-sm text-gray-600 mb-2 md:mb-0">
            © {new Date().getFullYear()} Mapa Interactivo. Todos los derechos reservados.
          </div>
          
          {/* Links */}
          <div className="flex space-x-4 text-sm text-gray-600">
            <Link 
              href="/about" 
              className="hover:text-[#004f59] transition-colors"
            >
              Sobre Nosotros
            </Link>
            <Link 
              href="/privacy" 
              className="hover:text-[#004f59] transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link 
              href="/terms" 
              className="hover:text-[#004f59] transition-colors"
            >
              Términos de Servicio
            </Link>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#004f59] transition-colors"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="text-xl" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#004f59] transition-colors"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#004f59] transition-colors"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
