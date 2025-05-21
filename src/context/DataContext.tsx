import React, { createContext, useContext, useState, useEffect } from 'react';
import { IEvent, IService, IDevotional } from '../types';
import eventsData from '../data/events.json';
import servicesData from '../data/services.json';
import devotionalsData from '../data/devotionals.json';

interface DataContextType {
  events: IEvent[];
  services: IService[];
  devotionals: IDevotional[];
  currentDevotional: IDevotional | null;
  addEvent: (event: IEvent) => void;
  updateEvent: (id: string, event: IEvent) => void;
  deleteEvent: (id: string) => void;
  addService: (service: IService) => void;
  updateService: (id: string, service: IService) => void;
  deleteService: (id: string) => void;
  updateDevotional: (id: string, devotional: IDevotional) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [devotionals, setDevotionals] = useState<IDevotional[]>([]);
  const [currentDevotional, setCurrentDevotional] = useState<IDevotional | null>(null);

  // Load initial data
  useEffect(() => {
    // In a real app, you would fetch this from an API
    // For demo, we'll load from JSON files and store in localStorage
    const storedEvents = localStorage.getItem('events');
    const storedServices = localStorage.getItem('services');
    const storedDevotionals = localStorage.getItem('devotionals');
    
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(eventsData);
      localStorage.setItem('events', JSON.stringify(eventsData));
    }
    
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      setServices(servicesData);
      localStorage.setItem('services', JSON.stringify(servicesData));
    }
    
    if (storedDevotionals) {
      setDevotionals(JSON.parse(storedDevotionals));
    } else {
      setDevotionals(devotionalsData);
      localStorage.setItem('devotionals', JSON.stringify(devotionalsData));
    }
  }, []);

  // Set current devotional
  useEffect(() => {
    if (devotionals.length > 0) {
      // Find today's devotional or the latest one
      const today = new Date().toISOString().split('T')[0];
      const todayDevotional = devotionals.find(dev => dev.date === today);
      
      if (todayDevotional) {
        setCurrentDevotional(todayDevotional);
      } else {
        // Sort by date and get the latest
        const sortedDevotionals = [...devotionals].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setCurrentDevotional(sortedDevotionals[0]);
      }
    }
  }, [devotionals]);

  // Event functions
  const addEvent = (event: IEvent) => {
    const newEvents = [...events, event];
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  const updateEvent = (id: string, updatedEvent: IEvent) => {
    const newEvents = events.map(event => event.id === id ? updatedEvent : event);
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  const deleteEvent = (id: string) => {
    const newEvents = events.filter(event => event.id !== id);
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  // Service functions
  const addService = (service: IService) => {
    const newServices = [...services, service];
    setServices(newServices);
    localStorage.setItem('services', JSON.stringify(newServices));
  };

  const updateService = (id: string, updatedService: IService) => {
    const newServices = services.map(service => service.id === id ? updatedService : service);
    setServices(newServices);
    localStorage.setItem('services', JSON.stringify(newServices));
  };

  const deleteService = (id: string) => {
    const newServices = services.filter(service => service.id !== id);
    setServices(newServices);
    localStorage.setItem('services', JSON.stringify(newServices));
  };

  // Devotional functions
  const updateDevotional = (id: string, updatedDevotional: IDevotional) => {
    const newDevotionals = devotionals.map(devotional => 
      devotional.id === id ? updatedDevotional : devotional
    );
    setDevotionals(newDevotionals);
    localStorage.setItem('devotionals', JSON.stringify(newDevotionals));
  };

  return (
    <DataContext.Provider
      value={{
        events,
        services,
        devotionals,
        currentDevotional,
        addEvent,
        updateEvent,
        deleteEvent,
        addService,
        updateService,
        deleteService,
        updateDevotional,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};