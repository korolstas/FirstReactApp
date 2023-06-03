import React from 'react';
import Home from './pages/Home/Home';
import Form from './pages/Form/FormUpdate';
import About from './pages/About/About';
import Error from './pages/Error404/Error404';
import { Route, Routes, Navigate } from 'react-router-dom';

const Routers = () => {
  return (
    <div className="container_123">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="form" element={<Form />} />
        <Route path="error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </div>
  );
};
export default Routers;
