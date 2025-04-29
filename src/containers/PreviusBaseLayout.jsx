import { useMachine } from '@xstate/react';
import bookingMachine from '../machines/bookingMachine';
import { Nav } from '../components/Nav';
import { StepsLayout } from './StepsLayout';

import './BaseLayout.css';

export const BaseLayout = () => {
    const [ state, send ] = useMachine(bookingMachine);
    console.log("Nuestra maquina", state)
    console.log("matches true", state.matches("inicial"));
    console.log("matches false", state.matches("tickets"));
    console.log("can", state.can("FINISH"));


	return (
        <div className="BaseLayout">
            <Nav />
            <StepsLayout state={state} send={send}/>
        </div>
    );
};
