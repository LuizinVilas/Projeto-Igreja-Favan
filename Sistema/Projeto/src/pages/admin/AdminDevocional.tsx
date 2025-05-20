import React, { useState, useEffect } from 'react';
import { BookOpen, Save, Calendar } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { IDevotional } from '../../types';

const AdminDevocional: React.FC = () => {
  const { devotionals, updateDevotional } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentDevotional, setCurrentDevotional] = useState<IDevotional | null>(null);
  const [formData, setFormData] = useState<IDevotional>({
    id: '',
    title: '',
    date: selectedDate,
    reference: '',
    verse: '',
    content: '',
    author: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  
  // Sort devotionals by date (newest first)
  const sortedDevotionals = [...devotionals].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Load devotional for selected date
  useEffect(() => {
    const devotionalForDate = devotionals.find(dev => dev.date === selectedDate);
    
    if (devotionalForDate) {
      setCurrentDevotional(devotionalForDate);
      setFormData(devotionalForDate);
    } else {
      // Create a new devotional for this date
      setCurrentDevotional(null);
      setFormData({
        id: `devotional-${Date.now()}`,
        title: '',
        date: selectedDate,
        reference: '',
        verse: '',
        content: '',
        author: '',
      });
    }
    
    // Clear messages
    setSuccessMessage('');
    setValidationError('');
  }, [selectedDate, devotionals]);
  
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
    if (!formData.title.trim() || !formData.reference.trim() || 
        !formData.verse.trim() || !formData.content.trim() || 
        !formData.author.trim()) {
      setValidationError('Por favor, preencha todos os campos.');
      return;
    }
    
    // Update or add devotional
    updateDevotional(formData.id, formData);
    
    // Show success message
    setSuccessMessage('Devocional salvo com sucesso!');
    
    // Clear error if any
    setValidationError('');
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
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
          <h1 className="text-2xl font-bold text-gray-800">Gerenciar Devocionais</h1>
          <p className="text-gray-600">Adicione ou edite devocionais diários</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Devotional List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Devocionais Recentes</h2>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto">
            {sortedDevotionals.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {sortedDevotionals.map(devotional => (
                  <button
                    key={devotional.id}
                    onClick={() => setSelectedDate(devotional.date)}
                    className={`block w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                      selectedDate === devotional.date ? 'bg-primary/5 border-l-4 border-primary' : ''
                    }`}
                  >
                    <h3 className="font-medium text-gray-800 line-clamp-1">{devotional.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{formatDate(devotional.date)}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <BookOpen size={48} className="mx-auto text-gray-400 mb-3" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum devocional</h3>
                <p className="text-gray-600">
                  Comece adicionando um novo devocional.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Devotional Form */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentDevotional ? 'Editar Devocional' : 'Novo Devocional'}
            </h2>
            
            <div className="mt-3 sm:mt-0 flex items-center">
              <Calendar size={20} className="text-gray-500 mr-2" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-input py-1 px-2"
              />
            </div>
          </div>
          
          {successMessage && (
            <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
              {successMessage}
            </div>
          )}
          
          {validationError && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
              {validationError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reference" className="form-label">
                    Referência Bíblica <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    placeholder="Ex: João 3:16"
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="author" className="form-label">
                    Autor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="verse" className="form-label">
                  Versículo <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="verse"
                  name="verse"
                  value={formData.verse}
                  onChange={handleChange}
                  rows={2}
                  className="form-input"
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="content" className="form-label">
                  Conteúdo <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={8}
                  className="form-input"
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="btn-primary flex items-center"
              >
                <Save size={18} className="mr-2" />
                Salvar Devocional
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDevocional;