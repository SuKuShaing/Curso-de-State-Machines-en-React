import { createMachine } from "xstate";

const bookingMachine = createMachine({
	id: "Buy plane ticket",
	initial: "inicial",
	states: {
		inicial: {
			on: {
				START: "search",
			},
		},
		search: {
			on: {
				CONTINUE: "passengers",
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
});

export default bookingMachine;
