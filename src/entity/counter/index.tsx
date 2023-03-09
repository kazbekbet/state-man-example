import React from 'react';
import {
  increment,
  decrement,
  clear,
  counterStore,
  asyncIncrement,
  isLoadingStore,
  errorReasonStore,
} from './model';
import { useStore } from '../../lib/react-adapter';

export function Counter() {
  const counter = useStore(counterStore);
  const isLoading = useStore(isLoadingStore);
  const errorReason = useStore(errorReasonStore);

  return (
    <>
      <h1>
        Current count = <span>{counter}</span>
      </h1>

      {isLoading && <span>Loading...</span>}
      {errorReason && <span>{errorReason}</span>}

      <div className="Buttons-container">
        <button className="Button" onClick={increment}>
          Increment
        </button>
        <button className="Button" onClick={decrement}>
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
        <button className="Button" onClick={clear}>
          Clear
        </button>
      </div>
    </>
  );
}
