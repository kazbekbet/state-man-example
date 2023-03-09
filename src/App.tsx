import React from 'react';
import './App.css';
import { Counter } from './entity/counter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
      </header>
    </div>
  );
}

export default App;
