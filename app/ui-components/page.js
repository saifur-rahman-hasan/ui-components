import {Provider} from "react-redux";
import store from "@/store";

export default function UIComponentsPage() {
	return (
		<Provider store={store}>
			<h1>UI Components List Page</h1>
		</Provider>
	)
}