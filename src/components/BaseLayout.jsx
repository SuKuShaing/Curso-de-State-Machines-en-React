import { useMachine } from '@xstate/react';
import bookingMachine from '../machines/bookingMachine';

export const BaseLayout = () => {
    const [ state, send ] = useMachine(bookingMachine);
    console.log("🚀 ~ BaseLayout ~ state:", state)


	return <div>Hola</div>;
};
