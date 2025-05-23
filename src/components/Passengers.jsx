import React, { useState } from 'react';
import './Passengers.css';

export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState('');

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const goToTicket = () => {
    send({ type: 'DONE' });
  }

  const submit = (e) => {
    e.preventDefault();
    send({ type: 'ADD', newPassenger: value });
    changeValue('');
  }

  const { passengers } = state.context;

  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar ✈️</p>
      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      {
        passengers.map((person, index) => (
          <p className='text' key={`person-${index}`}>{person}</p>
        ))
      }
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToTicket}
          disabled={passengers.length === 0}
          style={{
            opacity: passengers.length === 0 ? 0.6 : 1,
            cursor: passengers.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};