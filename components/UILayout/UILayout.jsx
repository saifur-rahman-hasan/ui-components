"use client"

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
	Bars3Icon,
	CalendarIcon,
	ChartPieIcon,
	DocumentDuplicateIcon,
	FolderIcon,
	HomeIcon,
	UsersIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import Sidebar from "@/components/UILayout/Sidebar";
import UIComponentQuickActionController from "@/components/UILayout/UIComponentQuickActionController";



export default function UILayout({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div>
			{/* Static sidebar for desktop */}
			{/*<Sidebar />*/}

			<div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
				<button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
					<span className="sr-only">Open sidebar</span>
					<Bars3Icon className="h-6 w-6" aria-hidden="true" />
				</button>
				<div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
				<a href="#">
					<span className="sr-only">Your profile</span>
					<img
						className="h-8 w-8 rounded-full bg-gray-800"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
				</a>
			</div>

			<main className={`p-10 bg-gray-200`}>
				{ children || 'No Content' }
			</main>

			<UIComponentQuickActionController />
		</div>
	)
}
