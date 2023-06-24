import './globals.css'
import { Inter } from 'next/font/google'
import {Provider} from "react-redux";
import store from "@/store";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'UI Components',
    description: 'A collection of user interface components for web development. Designed to enhance the functionality and aesthetics of your applications.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
            {children}
        </body>
        </html>
    )
}
