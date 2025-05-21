import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Hero from '../components/Hero';
import DevotionalCard from '../components/DevotionalCard';
import { useData } from '../context/DataContext';

const Devocional: React.FC = () => {
  const { devotionals } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Sort devotionals by date, newest first
  const sortedDevotionals = [...devotionals].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const currentDevotional = sortedDevotionals[currentIndex];
  
  const goToPrevious = () => {
    if (currentIndex < sortedDevotionals.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const goToNext = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  // Go to today's devotional or the latest
  const goToLatest = () => {
    setCurrentIndex(0);
  };

  return (
    <div>
      <Hero
        title="Devocional Diário"
        subtitle="Medite na Palavra de Deus e fortaleça sua fé a cada dia."
        imageUrl="https://images.pexels.com/photos/267559/pexels-photo-267559.jpeg"
      />
      
      <section className="section bg-white">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-primary mb-2">Devocional</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mensagens diárias para inspirar sua caminhada com Deus.
            </p>
          </div>
          
          {currentDevotional ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <button 
                  onClick={goToPrevious}
                  disabled={currentIndex >= sortedDevotionals.length - 1}
                  className={`btn-outline ${
                    currentIndex >= sortedDevotionals.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <ChevronLeft size={20} className="mr-1" />
                  Anterior
                </button>
                
                <button
                  onClick={goToLatest}
                  className="flex items-center px-4 py-2 text-primary hover:bg-primary/5 rounded-md transition-colors"
                >
                  <Calendar size={18} className="mr-2" />
                  Mais Recente
                </button>
                
                <button 
                  onClick={goToNext}
                  disabled={currentIndex <= 0}
                  className={`btn-outline ${
                    currentIndex <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Próximo
                  <ChevronRight size={20} className="ml-1" />
                </button>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <DevotionalCard devotional={currentDevotional} />
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Nenhum devocional disponível no momento.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Subscribe Section */}
      <section className="section bg-accent/20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Receba Nossos Devocionais
            </h2>
            <p className="text-gray-700 mb-8">
              Inscreva-se para receber nossos devocionais diretamente em seu e-mail todas as manhãs.
              Uma forma simples de iniciar seu dia com inspiração e reflexão bíblica.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form className="flex flex-col md:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Seu endereço de e-mail"
                  className="form-input flex-grow"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Inscrever-se
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3">
                Respeitamos sua privacidade. Você pode cancelar sua inscrição a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Devocional;