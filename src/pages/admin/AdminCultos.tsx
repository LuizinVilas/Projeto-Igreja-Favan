import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, Trash2, Plus, X, Info } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { IService } from '../../types';

const AdminCultos: React.FC = () => {
  const { services, addService, updateService, deleteService } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  
  const [showForm, setShowForm] = useState(!!editId);
  const [formData, setFormData] = useState<IService>({
    id: '',
    title: '',
    date: '',
    time: '',
    description: '',
  });
  const [validationError, setValidationError] = useState('');
  
  // Sort services by date (upcoming first)
  const sortedServices = [...services].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Filter by upcoming and past
  const today = new Date().toISOString().split('T')[0];
  const upcomingServices = sortedServices.filter(service => service.date >= today);
  const pastServices = sortedServices.filter(service => service.date < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Load service data if editing
  useEffect(() => {
    if (editId) {
      const serviceToEdit = services.find(service => service.id === editId);
      if (serviceToEdit) {
        setFormData(serviceToEdit);
        setShowForm(true);
      }
    } else {
      resetForm();
      setShowForm(false);
    }
  }, [editId, services]);
  
  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      date: '',
      time: '',
      description: '',
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
    if (!formData.title.trim() || !formData.date || !formData.time) {
      setValidationError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    if (formData.id) {
      // Update existing service
      updateService(formData.id, formData);
    } else {
      // Add new service
      const newService = {
        ...formData,
        id: `service-${Date.now()}`,
      };
      addService(newService);
    }
    
    // Reset form and close it
    resetForm();
    setShowForm(false);
    setSearchParams({});
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este culto?')) {
      deleteService(id);
      
      // If deleting the service currently being edited, close the form
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
          <h1 className="text-2xl font-bold text-gray-800">Gerenciar Cultos</h1>
          <p className="text-gray-600">Adicione, edite ou remova cultos da igreja</p>
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
          Novo Culto
        </button>
      </div>
      
      {/* Service Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {formData.id ? 'Editar Culto' : 'Novo Culto'}
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
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="form-label">
                  Descrição (opcional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="form-input"
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
                {formData.id ? 'Atualizar Culto' : 'Adicionar Culto'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Services List */}
      <div className="space-y-8">
        {/* Upcoming Services */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Próximos Cultos</h2>
          </div>
          
          {upcomingServices.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {upcomingServices.map(service => (
                <div key={service.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                      <p className="text-gray-600 mt-1">{formatDate(service.date)} • {service.time}</p>
                      {service.description && (
                        <p className="text-gray-700 mt-2">{service.description}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSearchParams({ edit: service.id })}
                        className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
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
              <Users size={48} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum culto próximo</h3>
              <p className="text-gray-600 mb-4">
                Não há cultos agendados para datas futuras.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary inline-flex items-center"
              >
                <Plus size={18} className="mr-1" />
                Adicionar Culto
              </button>
            </div>
          )}
        </div>
        
        {/* Past Services */}
        {pastServices.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Cultos Passados</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {pastServices.slice(0, 5).map(service => (
                <div key={service.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                      <p className="text-gray-600 mt-1">{formatDate(service.date)} • {service.time}</p>
                      {service.description && (
                        <p className="text-gray-700 mt-2">{service.description}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSearchParams({ edit: service.id })}
                        className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {pastServices.length > 5 && (
                <div className="p-4 text-center">
                  <p className="text-gray-600">
                    Exibindo os 5 cultos passados mais recentes de um total de {pastServices.length}.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCultos;