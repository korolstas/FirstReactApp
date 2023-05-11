import React, { Component } from 'react';
import Header from './pages/Header/home';
import Form from './pages/Form/form';
import About from './pages/About/about';
import Error from './pages/Error 404/index';
import { Route, Routes, Navigate } from 'react-router-dom';

export default class Routers extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="about" element={<About />} />
        <Route path="form" element={<Form />} />
        <Route path="error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    );
  }
}
