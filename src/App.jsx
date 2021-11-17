import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './components/Routing';
import './App.css';

function App() {
  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;
