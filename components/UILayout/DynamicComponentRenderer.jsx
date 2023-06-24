"use client"
import React, { useState, useEffect } from 'react';

function DynamicComponentRenderer({ componentPath }) {
	const [Component, setComponent] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadComponent = async () => {
			try {
				// Dynamically import the component
				const module = await import(`@/components/UIComponents/${componentPath}`);
				// Get the default export from the module
				const component = module.default;
				// Set the component in state
				setComponent(() => component);
				setIsLoading(false);
			} catch (error) {
				console.error('Error loading component:', error);
			}
		};

		loadComponent();
	}, [componentPath]);

	if (isLoading) {
		// Render the loading state
		return <div>Loading...</div>;
	}

	if (!Component) {
		// Render error state or fallback component
		return <div>Error loading component</div>;
	}

	// Render the loaded component
	return <Component />;
}

export default DynamicComponentRenderer;
