/* eslint-disable prettier/prettier */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routers from './routers';
import Head from './components/header/index';

function App() {
  return (
	<div className="App">
		<BrowserRouter>
			<Head/>
			<Routers/>
		</BrowserRouter>
	</div>
	);
}

export default App;
