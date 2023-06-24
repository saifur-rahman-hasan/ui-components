"use client"

import {useEffect, useState} from "react";
import UILayout from "@/components/UILayout/UILayout";
import DynamicComponentRenderer from "@/components/UILayout/DynamicComponentRenderer";
import {useSelector} from "react-redux";

export default function HomePage(){
	const uiComponentStore = useSelector(state => state.uiComponent)
	const activeComponent = uiComponentStore?.activeComponent || null
	const [component, setComponent] = useState({})

	useEffect(() => {
		if(activeComponent && activeComponent?.filePath){
			setComponent(activeComponent)
		}
	}, [activeComponent])

	return (
		<UILayout>
			{ component?.filePath && <DynamicComponentRenderer componentPath={component.filePath} />}
		</UILayout>
	)
}