
import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Film, Users, Star, Tag, BarChart3, Home } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
    { id: 'movies', label: 'Películas', icon: Film, path: '/movies' },
    { id: 'directors', label: 'Directores', icon: Users, path: '/directors' },
    { id: 'stars', label: 'Actores', icon: Star, path: '/stars' },
    { id: 'genres', label: 'Géneros', icon: Tag, path: '/genres' },
    { id: 'stats', label: 'Estadísticas', icon: BarChart3, path: '/stats' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="border-b border-border p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center">
                <Film className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-foreground">CineManager</h1>
                <p className="text-sm text-muted-foreground">Gestión de Películas</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.path)}
                      className={`w-full p-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-gold' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="ml-3 font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <SidebarTrigger className="lg:hidden" />
              <div className="hidden lg:block">
                <h2 className="text-2xl font-serif font-semibold text-foreground">
                  {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 gradient-gold rounded-full"></div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
