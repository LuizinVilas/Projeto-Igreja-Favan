import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink, 
  imageUrl 
}) => {
  return (
    <div className="relative h-[70vh] min-h-[500px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">{subtitle}</p>
          
          {buttonText && buttonLink && (
            <Link to={buttonLink} className="btn-primary">
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;