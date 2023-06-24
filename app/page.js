"use client"
import HomePage from "@/components/Pages/HomePage";
import {Provider} from "react-redux";
import store from "@/store";

export default function Home() {
    return (
        <Provider store={store}>
            <HomePage />
        </Provider>
    )
}
