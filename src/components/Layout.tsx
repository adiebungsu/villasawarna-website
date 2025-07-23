import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FloatingThemeToggle } from './FloatingThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <FloatingThemeToggle />
    </div>
  );
} 