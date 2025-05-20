import React from 'react';
import { IDevotional } from '../types';

interface DevotionalCardProps {
  devotional: IDevotional;
}

const DevotionalCard: React.FC<DevotionalCardProps> = ({ devotional }) => {
  const formattedDate = new Date(devotional.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="devotional-card">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-primary mb-2">{devotional.title}</h2>
        <p className="text-sm text-gray-600">{formattedDate}</p>
      </div>
      
      <div className="mb-4">
        <p className="text-lg font-medium mb-2 text-primary/90">
          {devotional.reference}
        </p>
        <p className="italic text-gray-700 mb-4">{devotional.verse}</p>
      </div>
      
      <div className="prose max-w-none text-gray-700">
        <p>{devotional.content}</p>
      </div>
      
      <div className="mt-4 text-right">
        <p className="font-medium text-primary">Por {devotional.author}</p>
      </div>
    </div>
  );
};

export default DevotionalCard;