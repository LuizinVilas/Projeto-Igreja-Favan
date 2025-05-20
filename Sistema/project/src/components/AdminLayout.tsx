import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Menu, X, LogOut, Layout as LayoutIcon, 
  Calendar, BookOpen, Users, ChevronRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="bg-primary text-white md:hidden py-4 px-4 flex items-center justify-between">
        <button
          className="text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div>
          <h1 className="text-lg font-semibold">Admin Morada Igreja</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-white p-2 rounded-full hover:bg-primary-dark transition-colors"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      </header>
      
      {/* Sidebar */}
      <div className="flex h-screen flex-col md:flex-row">
        <aside 
          className={`
            bg-primary text-white w-64 fixed inset-y-0 z-50 
            transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 md:min-h-screen
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="p-4 border-b border-white/10 hidden md:block">
            <h1 className="text-xl font-bold">Morada Igreja</h1>
            <p className="text-sm text-white/70">Painel Administrativo</p>
          </div>
          
          <nav className="mt-4 px-2">
            <NavLink
              to="/admin/dashboard"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center text-white py-3 px-4 rounded-md mb-1 
                ${isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}
                transition-colors duration-200
              `}
            >
              <LayoutIcon size={20} className="mr-3" />
              <span>Dashboard</span>
              <ChevronRight size={16} className="ml-auto" />
            </NavLink>
            
            <NavLink
              to="/admin/eventos"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center text-white py-3 px-4 rounded-md mb-1 
                ${isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}
                transition-colors duration-200
              `}
            >
              <Calendar size={20} className="mr-3" />
              <span>Eventos</span>
              <ChevronRight size={16} className="ml-auto" />
            </NavLink>
            
            <NavLink
              to="/admin/cultos"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center text-white py-3 px-4 rounded-md mb-1 
                ${isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}
                transition-colors duration-200
              `}
            >
              <Users size={20} className="mr-3" />
              <span>Cultos</span>
              <ChevronRight size={16} className="ml-auto" />
            </NavLink>
            
            <NavLink
              to="/admin/devocional"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center text-white py-3 px-4 rounded-md mb-1 
                ${isActive ? 'bg-white/20 font-medium' : 'hover:bg-white/10'}
                transition-colors duration-200
              `}
            >
              <BookOpen size={20} className="mr-3" />
              <span>Devocional</span>
              <ChevronRight size={16} className="ml-auto" />
            </NavLink>
          </nav>
          
          <div className="mt-auto p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-white py-2 px-4 rounded-md hover:bg-white/10 transition-colors duration-200"
            >
              <LogOut size={20} className="mr-3" />
              <span>Sair</span>
            </button>
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto md:ml-0 pt-16 md:pt-0">
          <div className="p-6 page-transition">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;