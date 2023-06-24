import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TheComponent = {
	directory: string;
	fileName: string;
	filePath: string;
};

type UiComponentState = {
	activeComponent: TheComponent | null;
};

const initialState: UiComponentState = {
	activeComponent: null,
};

export const uiComponentSlice = createSlice({
	name: "uiComponent",
	initialState,
	reducers: {
		reset: () => initialState,
		setActiveComponent: (state, action: PayloadAction<TheComponent>) => {
			state.activeComponent = action.payload;
		},
		resetActiveComponent: (state) => {
			state.activeComponent = null;
		},
	},
});

export const {
	reset,
	setActiveComponent,
	resetActiveComponent,
} = uiComponentSlice.actions;

export default uiComponentSlice.reducer;
