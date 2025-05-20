import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';

const Contato: React.FC = () => {
  return (
    <div>
      <Hero
        title="Entre em Contato"
        subtitle="Estamos aqui para responder suas dúvidas e receber seus pedidos de oração."
        imageUrl="https://images.pexels.com/photos/1471703/pexels-photo-1471703.jpeg"
      />
      
      <section className="section bg-white">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-primary mb-2">Fale Conosco</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Envie uma mensagem, solicite mais informações ou compartilhe um pedido de oração.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-800 mb-1">Endereço</h4>
                    <p className="text-gray-600">
                      Rua Exemplo, 123 - Bairro, Cidade - Estado, CEP 12345-678
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-800 mb-1">Telefone</h4>
                    <p className="text-gray-600">(00) 1234-5678</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">contato@moradaigrejabatista.com.br</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Clock size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-800 mb-1">Horário de Atendimento</h4>
                    <p className="text-gray-600">
                      Segunda a Sexta: 09:00 - 17:00<br />
                      Sábado: 09:00 - 12:00
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6">Envie sua Mensagem</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="section bg-secondary/30" id="mapa">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-primary mb-2">Como Chegar</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja nossa localização no mapa e planeje sua visita.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="aspect-w-16 aspect-h-9 h-96 w-full">
              {/* Note: In a real implementation, replace this with an actual Google Maps embed */}
              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-primary mx-auto mb-3" />
                  <p className="text-gray-700">
                    Aqui seria incorporado um mapa interativo com a localização da igreja.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-4">Como Nos Encontrar</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-lg text-gray-800 mb-2">De Carro</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Estacionamento próprio com vagas gratuitas</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Acesso fácil pela Avenida Principal</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>GPS: use "Morada Igreja Batista" como referência</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-lg text-gray-800 mb-2">Transporte Público</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Linhas de ônibus: 123, 456 e 789</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Descer no ponto "Centro Comercial"</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>7 minutos de caminhada até a igreja</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;