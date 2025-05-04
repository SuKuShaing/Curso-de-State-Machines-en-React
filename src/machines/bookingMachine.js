import { assign, createMachine } from "xstate";

const bookingMachine = createMachine(
	{
		id: "Buy plane ticket",
		initial: "inicial",
		context: {
			passengers: [],
			selectedCountry: '',
		},
		states: {
			inicial: {
				on: {
					// START: "search",
					START: {
						target: "search",
						actions: "imprimirInicio",
						// cuando hace la transición a search, ejecuta la acción imprimirInicio
					},
				},
			},
			search: {
				entry: "imprimirEntrada",
				// cuando ingresa al estado search, ejecuta la acción imprimirEntrada
				exit: "imprimirSalida",
				// cuando sale del estado search, ejecuta la acción imprimirSalida
				on: {
					CONTINUE: {
						target: "passengers",
						actions: assign({
							selectedCountry: ({event}) => {
								return event.selectedCountry
							}
							// quede en el minuto 5:23 de la clase 10 de platzi
						})
					},
					CANCEL: "inicial",
					BACK: "inicial",
				},
			},
			passengers: {
				on: {
					DONE: "tickets",
					CANCEL: "inicial",
					BACK: "search",
				},
			},
			tickets: {
				on: {
					FINISH: "inicial",
					BACK: "passengers",
				},
			},
		},
	},
	{
		actions: {
			imprimirInicio: () => {
				console.log("Imprimir inicio, que es la transición al estado inicial al search");
			},
			imprimirEntrada: () => {
				console.log("Imprimir entrada, que se ejecuta al entrar al estado search");
			},
			imprimirSalida: () => {
				console.log("Imprimir salida, que se ejecuta al salir del estado search");
			},
		},
	}
);

export default bookingMachine;
