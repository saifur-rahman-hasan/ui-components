import React, { useEffect, useState } from 'react';
import classNames from "@/lib/classNames";

function UIComponentsListDirectory({ onSelected }) {
	const [fileList, setFileList] = useState([]);
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch('/api/ui-components')
			.then((response) => response.json())
			.then((data) => setFileList(data.data))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	const formatComponentName = (componentName) => {
		return componentName
			.split('/')
			.map((name) => name.replace(/([A-Z])/g, ' $1'))
			.join(' / ');
	};

	function loadComponent(path) {
		alert(JSON.stringify(path, null, 2))
	}

	return (
		<div className="flex flex-1 flex-col gap-y-7">
			{ loading && <div>Loading...</div> }
			{ !loading && fileList?.length === 0 && <div>No Files</div> }

			{ !loading && fileList?.length > 0 && (
				<ul>
					{fileList.map((file, index) => (
						<li key={`ui-component-id-${index}`} onClick={() => onSelected(file)}>
							<div
								className={classNames(
									file?.current
										? 'bg-gray-800 text-white'
										: 'text-gray-400 hover:text-white hover:bg-gray-800',
									'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
								)}
							>
								{formatComponentName(file.fileName)}
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default UIComponentsListDirectory;
