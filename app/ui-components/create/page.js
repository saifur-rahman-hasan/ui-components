"use client"

import store from "@/store";
import {Provider} from "react-redux";
import UIComponentCreatePage from "@/components/Pages/UIComponentCreatePage";


export default function UIComponentCreate() {
	return (
		<Provider store={store}>
			<UIComponentCreatePage />
		</Provider>
	)
}
