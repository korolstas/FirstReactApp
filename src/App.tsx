import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routers';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = 5000; // время задержки в миллисекундах

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {isLoading ? <Loader /> : <Routers />}
      </BrowserRouter>
    </div>
  );
}

export default App;
