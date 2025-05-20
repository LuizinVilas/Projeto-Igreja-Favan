import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Trash2, Plus, X, Info } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { IEvent } from '../../types';

const AdminEventos: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  
  const [showForm, setShowForm] = useState(!!editId);
  const [formData, setFormData] = useState<IEvent>({
    id: '',
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    registrationUrl: '',
  });
  const [validationError, setValidationError] = useState('');
  
  // Sort events by date (newest first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Load event data if editing
  useEffect(() => {
    if (editId) {
      const eventToEdit = events.find(event => event.id === editId);
      if (eventToEdit) {
        setFormData(eventToEdit);
        setShowForm(true);
      }
    } else {
      resetForm();
      setShowForm(false);
    }
  }, [editId, events]);
  
  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      registrationUrl: '',
    });
    setValidationError('');
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.date || !formData.time || !formData.location.trim()) {
      setValidationError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    if (formData.id) {
      // Update existing event
      updateEvent(formData.id, formData);
    } else {
      // Add new event
      const newEvent = {
        ...formData,
        id: `event-${Date.now()}`,
      };
      addEvent(newEvent);
    }
    
    // Reset form and close it
    resetForm();
    setShowForm(false);
    setSearchParams({});
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este evento?')) {
      deleteEvent(id);
      
      // If deleting the event currently being edited, close the form
      if (id === editId) {
        setShowForm(false);
        setSearchParams({});
      }
    }
  };
  
  const closeForm = () => {
    setShowForm(false);
    setSearchParams({});
    resetForm();
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gerenciar Eventos</h1>
          <p className="text-gray-600">Adicione, edite ou remova eventos da igreja</p>
        </div>
        
        <button
          onClick={() => {
            setShowForm(true);
            resetForm();
            setSearchParams({});
          }}
          className="mt-4 sm:mt-0 btn-primary flex items-center"
          disabled={showForm}
        >
          <Plus size={18} className="mr-1" />
          Novo Evento
        </button>
      </div>
      
      {/* Event Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {formData.id ? 'Editar Evento' : 'Novo Evento'}
            </h2>
            <button
              onClick={closeForm}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Fechar formulário"
            >
              <X size={20} />
            </button>
          </div>
          
          {validationError && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-start">
              <Info size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="title" className="form-label">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="location" className="form-label">
                  Local <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="date" className="form-label">
                  Data <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="time" className="form-label">
                  Horário <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="Ex: 19:00"
                  className="form-input"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="registrationUrl" className="form-label">
                  URL de Inscrição (opcional)
                </label>
                <input
                  type="url"
                  id="registrationUrl"
                  name="registrationUrl"
                  value={formData.registrationUrl}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="form-label">
                  Descrição <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="form-input"
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                {formData.id ? 'Atualizar Evento' : 'Adicionar Evento'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Events List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Eventos</h2>
        </div>
        
        {sortedEvents.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {sortedEvents.map(event => (
              <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(event.date)} • {event.time}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{event.location}</p>
                    <p className="text-gray-700 mt-2 line-clamp-2">{event.description}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSearchParams({ edit: event.id })}
                      className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Calendar size={48} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum evento encontrado</h3>
            <p className="text-gray-600 mb-4">
              Você ainda não adicionou nenhum evento.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary inline-flex items-center"
            >
              <Plus size={18} className="mr-1" />
              Adicionar Evento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventos;