import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className='main-container'>
      <Navbar />
      <Routes />
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
