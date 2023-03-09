import React from 'react';
import {
  increment,
  decrement,
  clear,
  counterStore,
  asyncIncrement,
  statusStore,
} from './model';
import { useStore } from '../../lib/react-adapter';

const INCREMENT_MORE_COUNT = 1_000_000;

export default function Counter() {
  const counter = useStore(counterStore);
  const { isLoading, isError, errorReason, isFulfilled } =
    useStore(statusStore);

  function handleIncrementMore() {
    for (let i = 0; i < INCREMENT_MORE_COUNT; i++) {
      increment();
    }
  }

  return (
    <>
      <h1>
        Current count = <span>{counter}</span>
      </h1>

      {isLoading && <span>Loading...</span>}
      {isError && <span style={{ color: 'red' }}>{errorReason}</span>}
      {isFulfilled && (
        <span style={{ color: 'green' }}>Успешно загружено!</span>
      )}

      <div className="Buttons-container">
        <button className="Button" onClick={() => increment()}>
          Increment
        </button>
        <button className="Button" onClick={() => decrement()}>
          Decrement
        </button>
        <button
          className="Button"
          disabled={isLoading}
          onClick={() =>
            asyncIncrement({ countTo: 10, delay: 1000, isReject: false })
          }
        >
          Async increment
        </button>
        <button
          className="Button"
          disabled={isLoading}
          onClick={() =>
            asyncIncrement({ countTo: 10, delay: 1000, isReject: true })
          }
        >
          Async increment with error
        </button>
        <button className="Button" onClick={handleIncrementMore}>
          Call increment {INCREMENT_MORE_COUNT} count!
        </button>
        <button className="Button" onClick={() => clear()}>
          Clear
        </button>
      </div>
    </>
  );
}
