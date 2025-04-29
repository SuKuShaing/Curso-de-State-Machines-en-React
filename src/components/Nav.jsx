import React from 'react';
import './Nav.css';

export const Nav = ({ state, send }) => {
  const goToWelcome = () => {
    send({ type: 'CANCEL' });
  }

  const goToBack = () => {
    send({ type: 'BACK' });
  };

  return (
    <nav className='Nav'>
      <h1 className='Nav-logo'>Book a fly ✈</h1>
      {!state.matches('inicial') &&
        <button onClick={goToBack} className='Nav-cancel button-secondary'>⬅</button>
      }
      {!state.matches('inicial') &&
        <button onClick={goToWelcome} className='Nav-cancel button-secondary'>Cancelar</button>
      }
    </nav>
  );
}; 