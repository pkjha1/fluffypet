import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Navbar from '../components/navigation/navbar';
import '../styles/globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  return (
    <ClerkProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </ClerkProvider>
  );
};

export default Layout;