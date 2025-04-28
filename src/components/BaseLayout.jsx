import { useMachine } from '@xstate/react';
import bookingMachine from '../machines/bookingMachine';

export const BaseLayout = () => {
    const [ state, send ] = useMachine(bookingMachine);
    console.log("Nuestra maquina", state)
    console.log("matches true", state.matches("inicial"));
    console.log("matches false", state.matches("tickets"));
    console.log("can", state.can("FINISH"));


	return <div>Hola</div>;
};
