import React from 'react';
import Head from 'next/head';

const Layout = ({ children, title = "Course Details" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow p-4">
          {/* Your header content, e.g., logo, nav */}
          <nav className="container mx-auto flex justify-between items-center">
            <span className="font-bold text-xl">My Course App</span>
            {/* Other nav items */}
          </nav>
        </header>
        <main className="container mx-auto p-4 md:p-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          {/* Your footer content */}
          &copy; {new Date().getFullYear()} My Course App
        </footer>
      </div>
    </>
  );
};

export default Layout;