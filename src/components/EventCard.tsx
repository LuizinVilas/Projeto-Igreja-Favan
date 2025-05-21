import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { IEvent } from '../types';

interface EventCardProps {
  event: IEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="event-card">
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-semibold text-primary mb-2">{event.title}</h3>
        
        <div className="mb-4 text-gray-700">
          <div className="flex items-center mb-2">
            <Calendar size={16} className="mr-2" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center mb-2">
            <Clock size={16} className="mr-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 flex-grow">{event.description}</p>
        
        {event.registrationUrl && (
          <div className="mt-auto">
            <a 
              href={event.registrationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline inline-block"
            >
              Inscrever-se
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;