import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routers';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routers />
      </BrowserRouter>
    </div>
  );
}

export default App;
