import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen, Users, Edit, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Dashboard: React.FC = () => {
  const { events, services, devotionals } = useData();
  
  // Filter upcoming events
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get upcoming services
  const upcomingServices = services
    .filter(service => service.date >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  // Get latest devotional
  const latestDevotional = [...devotionals]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo ao painel administrativo da Morada Igreja Batista</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm bg-accent/30 text-primary py-1 px-3 rounded-full">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-primary">
          <div className="flex items-center">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <Calendar size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-600">Eventos</h2>
              <p className="text-2xl font-bold text-gray-800">{events.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-primary">
          <div className="flex items-center">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <Users size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-600">Cultos</h2>
              <p className="text-2xl font-bold text-gray-800">{services.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-primary">
          <div className="flex items-center">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <BookOpen size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-600">Devocionais</h2>
              <p className="text-2xl font-bold text-gray-800">{devotionals.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Próximos Eventos</h2>
            <Link 
              to="/admin/eventos" 
              className="text-primary hover:text-primary/80 transition-colors flex items-center"
            >
              Ver Todos <ChevronRight size={16} />
            </Link>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium text-gray-800">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })} • {event.time}
                  </p>
                  <Link 
                    to={`/admin/eventos?edit=${event.id}`}
                    className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center"
                  >
                    <Edit size={14} className="mr-1" /> Editar
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-6">Não há eventos próximos.</p>
          )}
        </div>
        
        {/* Upcoming Services */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Próximos Cultos</h2>
            <Link 
              to="/admin/cultos" 
              className="text-primary hover:text-primary/80 transition-colors flex items-center"
            >
              Ver Todos <ChevronRight size={16} />
            </Link>
          </div>
          
          {upcomingServices.length > 0 ? (
            <div className="space-y-4">
              {upcomingServices.map(service => (
                <div key={service.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium text-gray-800">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(service.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })} • {service.time}
                  </p>
                  <Link 
                    to={`/admin/cultos?edit=${service.id}`}
                    className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center"
                  >
                    <Edit size={14} className="mr-1" /> Editar
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-6">Não há cultos próximos.</p>
          )}
        </div>
        
        {/* Latest Devotional */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Devocional Recente</h2>
            <Link 
              to="/admin/devocional" 
              className="text-primary hover:text-primary/80 transition-colors flex items-center"
            >
              Editar <ChevronRight size={16} />
            </Link>
          </div>
          
          {latestDevotional ? (
            <div>
              <h3 className="font-medium text-gray-800">{latestDevotional.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(latestDevotional.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
              <p className="text-sm font-medium text-primary mb-2">{latestDevotional.reference}</p>
              <p className="text-sm text-gray-700 line-clamp-3 mb-2">
                {latestDevotional.content.substring(0, 120)}...
              </p>
              <p className="text-sm text-gray-600 italic">Por {latestDevotional.author}</p>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-6">Nenhum devocional disponível.</p>
          )}
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Acesso Rápido</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link 
            to="/admin/eventos" 
            className="group p-4 border border-gray-100 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                <Calendar size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Gerenciar Eventos</h3>
                <p className="text-sm text-gray-600">Adicionar, editar ou remover eventos</p>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/admin/cultos" 
            className="group p-4 border border-gray-100 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                <Users size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Gerenciar Cultos</h3>
                <p className="text-sm text-gray-600">Atualizar a agenda de cultos</p>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/admin/devocional" 
            className="group p-4 border border-gray-100 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Gerenciar Devocionais</h3>
                <p className="text-sm text-gray-600">Atualizar devocionais diários</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;