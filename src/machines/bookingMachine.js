import { assign, createMachine, fromPromise } from "xstate";
import { fetchCountries } from "../utils/api";

// Maquina hija
const fillCountries = {
	initial: "loading",
	states: {
		loading: {
			// documentación: https://stately.ai/docs/invoke#invoking-promises
			invoke: {
				id: "getCountries",
				src: fromPromise(() => fetchCountries()),
				onDone: {  // cuando la promesa se cumple y termina la invocación se ejecuta la acción onDone
					target: "success",
					actions: assign({ 
						countries: ({event}) => event.output
					})
				},
				onError: {  // cuando la promesa falla se ejecuta la acción onError
					target: "failure",
					actions: assign({
						error: "Fallo el request",  // error: ({ event }) => event.error
					}),
				},
			},
		},
		success: {},
		failure: {
			on: {
				RETRY: { target: "loading" },
			},
		},
	},
};

// Maquina principal
const bookingMachine = createMachine(
	{
		id: "Buy plane ticket",
		initial: "inicial",
		context: {
			passengers: [],
			selectedCountry: "",
			countries: [],
			error: '',
		},
		states: {
			inicial: {
				entry: "limpiarContexto",  // cuando entra al estado inicial se ejecuta la acción limpiarContexto
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
							selectedCountry: ({ event }) => {
								return event.selectedCountry;
							},
						}),
					},
					CANCEL: "inicial",
					BACK: "inicial",
				},
				...fillCountries, // se agrega una maquina estado hija
			},
			passengers: {
				on: {
					// DONE: "tickets",
					DONE: {
						target: "tickets",
						guard: "moreThanOnePassenger",  // colocamos una verificación para que no se pueda avanzar si no hay al menos un pasajero
					},
					CANCEL: "inicial",
					BACK: "search",
					ADD: {
						target: "passengers", // se queda en el mismo estado
						actions: assign(({ context, event }) => {
							// agrega el pasajero al contexto
							return {
								passengers: [...context.passengers, event.newPassenger],
							};
						}),
					},
				},
			},
			tickets: {
				after: {  // transición con delay, después de 5 segundos se va al estado inicial
					5000: "inicial",
				},
				on: {
					BACK: "passengers",
					FINISH: "inicial",
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
			limpiarContexto: assign({
				passengers: [],
				selectedCountry: "",
				countries: [],
				error: "",
			}),
		},
		guards: {
			moreThanOnePassenger: ({ context }) => {
				// si hay más de un pasajero, se puede continuar
				return context.passengers.length > 0;
			},
		},
	}
);

export default bookingMachine;
