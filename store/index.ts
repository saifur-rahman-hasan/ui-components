import { configureStore } from "@reduxjs/toolkit";
import {counterSlice} from "@/store/features/counterSlice";
import { uiComponentSlice } from "@/store/features/uiComponentSlice";
import { userApi } from "@/store/services/userApi";
import { uiComponentApi } from "@/store/services/uiComponentApi";

export default configureStore({
	devTools: process.env.NODE_ENV !== "production",

	reducer: {
		[counterSlice.name]: counterSlice.reducer,
		[uiComponentSlice.name]: uiComponentSlice.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[uiComponentApi.reducerPath]: uiComponentApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({})
			.concat([userApi.middleware])
			.concat([uiComponentApi.middleware])

});