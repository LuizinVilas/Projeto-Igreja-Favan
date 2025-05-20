import React from 'react';
import { IService } from '../types';

interface ServiceCalendarProps {
  services: IService[];
  month: number;
  year: number;
}

const ServiceCalendar: React.FC<ServiceCalendarProps> = ({ services, month, year }) => {
  // Days of the week in Portuguese
  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  // Function to get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Function to get first day of month
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Get calendar data
  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfMonth = getFirstDayOfMonth(month, year);
  
  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  // Find services for each day
  const getServicesForDay = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return services.filter(service => service.date === dateString);
  };

  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-white">
      <div className="bg-primary text-white py-4 px-4 text-center">
        <h3 className="text-xl font-semibold">
          {new Date(year, month).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </h3>
      </div>
      
      <div className="grid grid-cols-7 bg-gray-100">
        {weekdays.map(day => (
          <div key={day} className="py-2 text-center font-medium text-gray-700">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          const dayServices = day ? getServicesForDay(day) : [];
          const hasService = dayServices.length > 0;
          
          return (
            <div 
              key={index} 
              className={`min-h-24 border border-gray-100 p-2 ${
                !day ? 'bg-gray-50' : hasService ? 'bg-secondary/30' : ''
              }`}
            >
              {day && (
                <>
                  <div className={`text-right font-medium ${hasService ? 'text-primary' : 'text-gray-700'}`}>
                    {day}
                  </div>
                  
                  <div className="mt-1">
                    {dayServices.map((service, idx) => (
                      <div key={idx} className="text-xs p-1 mb-1 bg-white rounded shadow-sm">
                        <p className="font-medium text-primary">{service.title}</p>
                        <p className="text-gray-600">{service.time}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceCalendar;