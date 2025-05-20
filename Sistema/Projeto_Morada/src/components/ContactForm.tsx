import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when typing in message field
    if (name === 'message' && errors.message) {
      setErrors(prev => ({
        ...prev,
        message: '',
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.message.trim()) {
      setErrors(prev => ({
        ...prev,
        message: 'Por favor, escreva sua mensagem.',
      }));
      return;
    }
    
    // In a real app, send the form data to a server
    console.log('Form data submitted:', formData);
    
    // Show success message
    setSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {submitted ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-md animate-fade-in mb-4">
          <h3 className="font-bold text-lg mb-2">Mensagem Enviada!</h3>
          <p>Sua mensagem foi recebida. Agradecemos seu contato.</p>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Nome (opcional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email (opcional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="form-label">
            Mensagem <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`form-input ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            placeholder="Escreva sua mensagem, pedido de oração ou dúvida..."
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full md:w-auto"
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
};

export default ContactForm;