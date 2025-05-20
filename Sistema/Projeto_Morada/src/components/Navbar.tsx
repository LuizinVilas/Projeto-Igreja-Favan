import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary shadow-md py-2' : 'bg-primary/90 py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center text-white">
          <span className="font-semibold text-xl md:text-2xl">Morada Igreja Batista</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Início
          </NavLink>
          <NavLink 
            to="/eventos" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Eventos
          </NavLink>
          <NavLink 
            to="/cultos" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Cultos
          </NavLink>
          <NavLink 
            to="/devocional" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Devocional
          </NavLink>
          <NavLink 
            to="/contato" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Contato
          </NavLink>
        </nav>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary/95 absolute top-full left-0 right-0 shadow-lg animate-fade-in">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={() => setIsOpen(false)}
            >
              Início
            </NavLink>
            <NavLink 
              to="/eventos" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={() => setIsOpen(false)}
            >
              Eventos
            </NavLink>
            <NavLink 
              to="/cultos" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={() => setIsOpen(false)}
            >
              Cultos
            </NavLink>
            <NavLink 
              to="/devocional" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={() => setIsOpen(false)}
            >
              Devocional
            </NavLink>
            <NavLink 
              to="/contato" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={() => setIsOpen(false)}
            >
              Contato
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;