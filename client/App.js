import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import ContactUs from './components/ContactUs';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className='main-container'>
      <Navbar />
      <Routes />
      <ContactUs />
      <Toaster />
    </div>
  );
};

export default App;
