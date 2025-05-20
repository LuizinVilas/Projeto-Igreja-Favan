import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Morada Igreja Batista</h3>
            <p className="mb-4">
              Uma igreja que ama a Jesus e sua Palavra, comprometida em servir a comunidade
              e proclamar o Evangelho.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">Início</Link>
              </li>
              <li>
                <Link to="/eventos" className="hover:text-accent transition-colors">Eventos</Link>
              </li>
              <li>
                <Link to="/cultos" className="hover:text-accent transition-colors">Cultos</Link>
              </li>
              <li>
                <Link to="/devocional" className="hover:text-accent transition-colors">Devocional</Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-accent transition-colors">Contato</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>Rua Exemplo, 123 - Bairro, Cidade - Estado, CEP 12345-678</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>(00) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>contato@moradaigrejabatista.com.br</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-primary-dark py-4 border-t border-white/20">
        <div className="container-custom text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Morada Igreja Batista. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;