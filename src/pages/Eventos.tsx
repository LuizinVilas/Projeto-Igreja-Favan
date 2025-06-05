import React, { useState } from 'react';
import { Calendar, Clock, Filter } from 'lucide-react';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import { useData } from '../context/DataContext';

const Eventos: React.FC = () => {
  const { events } = useData();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    
    if (filter === 'upcoming') {
      return eventDate >= today;
    } else if (filter === 'past') {
      return eventDate < today;
    }
    
    return true; // 'all' filter
  }).sort((a, b) => {
    // Sort by date (upcoming first)
    if (filter === 'upcoming' || filter === 'all') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      // Past events (most recent first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  return (
    <div>
      <Hero
        title="Eventos"
        subtitle="Participe dos nossos eventos e cresça na fé junto com nossa comunidade."
        imageUrl="https://raw.githubusercontent.com/LuizinVilas/Projeto-Igreja-Favan/refs/heads/main/Sistema/Projeto_Morada/imagens/Events-Banner.png"
      />
      
      <section className="section bg-white">
        <div className="container-custom">
          {/* Filter Controls */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold text-primary">
              {filter === 'upcoming' ? 'Próximos Eventos' : 
               filter === 'past' ? 'Eventos Passados' : 'Todos os Eventos'}
            </h2>
            
            <div className="inline-flex items-center bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === 'all' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === 'upcoming' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Próximos
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === 'past' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Passados
              </button>
            </div>
          </div>
          
          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum evento encontrado</h3>
              <p className="text-gray-600">
                {filter === 'upcoming' 
                  ? 'Não há eventos próximos agendados no momento.' 
                  : filter === 'past' 
                    ? 'Não há eventos passados para exibir.'
                    : 'Não há eventos cadastrados.'}
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Additional Info */}
      <section className="section bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Sobre Nossos Eventos</h2>
              <p className="text-gray-700 mb-4">
                Na Morada Igreja Batista, realizamos diversos eventos ao longo do ano,
                incluindo conferências, retiros, atividades para jovens e famílias, além
                de encontros de estudo bíblico.
              </p>
              <p className="text-gray-700">
                Nosso objetivo é proporcionar momentos de comunhão, aprendizado e crescimento
                espiritual para toda a comunidade. Todos são bem-vindos a participar,
                independentemente de serem membros da igreja.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                <Clock size={20} className="mr-2" />
                Informações Úteis
              </h3>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="text-primary font-medium mr-2">•</span>
                  <span>Para eventos que exigem inscrição, é necessário realizar o cadastro com antecedência.</span>
                </li>
                <li className="flex">
                  <span className="text-primary font-medium mr-2">•</span>
                  <span>A maioria dos eventos são gratuitos, mas alguns podem ter taxas para cobrir custos.</span>
                </li>
                <li className="flex">
                  <span className="text-primary font-medium mr-2">•</span>
                  <span>Chegue com pelo menos 15 minutos de antecedência para garantir sua acomodação.</span>
                </li>
                <li className="flex">
                  <span className="text-primary font-medium mr-2">•</span>
                  <span>Para mais informações sobre qualquer evento, entre em contato pelo nosso formulário.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Eventos;