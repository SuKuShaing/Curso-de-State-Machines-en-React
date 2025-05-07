import React from 'react';
import { Welcome } from '../components/Welcome';
import { Search } from '../components/Search';
import { Passengers } from '../components/Passengers';
import { Tickets } from '../components/Tickets';
import './StepsLayout.css';

export const StepsLayout = ({ state, send }) => {
  
  const renderContent = () => {
    if(state.matches('inicial')) return <Welcome send={send}/>;
    if(state.matches('search')) return <Search state={state} send={send}/>;
    if(state.matches('passengers')) return <Passengers send={send} state={state}/>;
    if(state.matches('tickets')) return <Tickets send={send} state={state}/>;
    return null;
  };

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}; 