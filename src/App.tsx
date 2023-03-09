import React, { lazy, Suspense } from 'react';
import './App.css';
const Counter = lazy(() => import('./entity/counter'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Suspense fallback="Загрузка...">
          <Counter />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
