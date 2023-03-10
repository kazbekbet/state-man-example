import React, { lazy, Suspense } from 'react';
import './App.css';

const EvenCounter = lazy(() => import('./entity/even-counter'));
const Counter = lazy(() => import('./entity/counter'));
const FiveCounter = lazy(() => import('./entity/five-counter'));

//const Void = lazy(() => import('./entity/void'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Suspense fallback="Загрузка...">
          <FiveCounter />
          <EvenCounter />
          <Counter />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
