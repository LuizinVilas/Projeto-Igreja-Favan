import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen, MapPin, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import DevotionalCard from '../components/DevotionalCard';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { events, currentDevotional } = useData();
  
  // Get upcoming events (max 3)
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div>
      <Hero
        title="Bem-vindo à Morada Igreja Batista"
        subtitle="Uma igreja que ama a Deus, sua Palavra e seu povo."
        buttonText="Conheça Nossos Cultos"
        buttonLink="/cultos"
        imageUrl="https://images.pexels.com/photos/2425673/pexels-photo-2425673.jpeg"
      />
      
      {/* Welcome Section */}
      <section className="section bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Nossa Igreja</h2>
              <p className="text-gray-700 mb-6">
                A Morada Igreja Batista é uma comunidade de fé comprometida com a Palavra de Deus
                e o serviço ao próximo. Valorizamos a família, o discipulado e a adoração
                sincera a Deus.
              </p>
              <p className="text-gray-700 mb-6">
                Somos uma igreja acolhedora onde todos são bem-vindos, independentemente
                de sua origem ou história. Acreditamos que Deus tem um propósito para 
                cada pessoa e desejamos caminhar junto com você nessa jornada.
              </p>
              <Link to="/contato" className="btn-primary inline-flex items-center">
                Entre em Contato <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/939702/pexels-photo-939702.jpeg" 
                alt="Membros da Igreja" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-primary mb-2">Próximos Eventos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Participe dos nossos eventos e cresça na fé junto com nossa comunidade.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-600">Não há eventos agendados no momento.</p>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/eventos" className="btn-outline inline-flex items-center">
              Ver Todos os Eventos <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Devotional Section */}
      <section className="section bg-secondary/50">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-primary mb-2">Devocional do Dia</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Um momento diário para refletir na Palavra de Deus e renovar sua fé.
            </p>
          </div>
          
          {currentDevotional ? (
            <div className="max-w-3xl mx-auto">
              <DevotionalCard devotional={currentDevotional} />
              
              <div className="mt-8 text-center">
                <Link to="/devocional" className="btn-primary inline-flex items-center">
                  Acessar Devocionais <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Devocional não disponível no momento.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section 
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg')" }}
      >
        <div className="absolute inset-0 bg-primary opacity-80"></div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Junte-se a Nós nos Cultos
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Participe de nossos cultos semanais e faça parte desta comunidade de fé.
            Todos são bem-vindos!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/cultos" className="btn-secondary">
              Horários dos Cultos
            </Link>
            <Link to="/contato" className="bg-white text-primary hover:bg-white/90 font-semibold py-2 px-6 rounded-md transition-all duration-300 shadow-sm">
              Como Chegar
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Eventos Regulares</h3>
              <p className="text-gray-600">
                Participe de nossos eventos regulares, incluindo grupos de estudo bíblico, 
                retiros espirituais e atividades sociais.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Estudos Bíblicos</h3>
              <p className="text-gray-600">
                Aprenda e cresça em sua fé através de nossos estudos bíblicos semanais 
                e materiais devocionais diários.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Localização Acessível</h3>
              <p className="text-gray-600">
                Nossa igreja está estrategicamente localizada para facilitar o acesso 
                de todos os membros e visitantes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;