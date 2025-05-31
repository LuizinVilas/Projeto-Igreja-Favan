import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import Hero from '../components/Hero';
import ServiceCalendar from '../components/ServiceCalendar';
import { useData } from '../context/DataContext';

const Cultos: React.FC = () => {
  const { services } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  // Reset to current month
  const resetToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  return (
    <div>
      <Hero
        title="Agenda de Cultos"
        subtitle="Conheça os horários dos nossos cultos e venha adorar conosco."
        imageUrl="https://raw.githubusercontent.com/LuizinVilas/Projeto-Igreja-Favan/refs/heads/main/public/imagens/Culto%20Online%20Azul.png"
      />
      
      <section className="section bg-white">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-primary mb-2">Calendário de Cultos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja abaixo nossa programação de cultos e participe conosco em um horário conveniente para você.
            </p>
          </div>
          
          <div className="mb-6 flex items-center justify-between">
            <button 
              onClick={previousMonth}
              className="btn-outline"
            >
              <ChevronLeft size={20} className="mr-1" />
              Mês Anterior
            </button>
            
            <button
              onClick={resetToCurrentMonth}
              className="flex items-center px-4 py-2 text-primary hover:bg-primary/5 rounded-md transition-colors"
            >
              <CalendarIcon size={18} className="mr-2" />
              Mês Atual
            </button>
            
            <button 
              onClick={nextMonth}
              className="btn-outline"
            >
              Próximo Mês
              <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
          
          <ServiceCalendar 
            services={services} 
            month={month} 
            year={year} 
          />
          
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-primary mb-6">Nossos Cultos Regulares</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-secondary/30 rounded-lg p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-primary mb-2">Culto de Domingo</h4>
                <p className="text-gray-700 mb-4">
                  Nosso principal culto semanal, com louvor, oração e pregação da Palavra.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Horário: 10:00 e 18:00</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Escola Bíblica: 09:00</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-primary mb-2">Culto de Oração</h4>
                <p className="text-gray-700 mb-4">
                  Um momento dedicado à oração e intercessão pela igreja e necessidades.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Dia: Quarta-feira</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Horário: 19:30</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-primary mb-2">Culto Jovem</h4>
                <p className="text-gray-700 mb-4">
                  Um culto dinâmico voltado especialmente para os jovens da igreja.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Dia: Sábado</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Horário: 19:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Info */}
      <section className="section bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Venha nos Visitar</h2>
              <p className="mb-4 opacity-90">
                Nossa igreja está de portas abertas para receber você e sua família. 
                Venha conhecer nossa comunidade e crescer na fé conosco.
              </p>
              <p className="mb-6 opacity-90">
                Oferecemos um ambiente acolhedor onde todos são bem-vindos, independentemente 
                da idade ou experiência com a fé.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#mapa" className="bg-white text-primary hover:bg-white/90 font-semibold py-2 px-6 rounded-md transition-all duration-300 shadow-sm">
                  Como Chegar
                </a>
                <a href="/contato" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-2 px-6 rounded-md transition-all duration-300">
                  Entre em Contato
                </a>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/274679/pexels-photo-274679.jpeg" 
                alt="Interior da Igreja" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cultos;