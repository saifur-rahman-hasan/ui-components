import { useEffect, useState } from "react";
import { useGetUIComponentsQuery } from "@/store/services/uiComponentApi";
import Dump from "@/components/Dump";
import { useDispatch } from "react-redux";
import { setActiveComponent as setActiveComponentState } from "@/store/features/uiComponentSlice";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {MagnifyingGlassIcon, PencilIcon, PlusIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

function ComponentSwitchPreviousAndNext({ UIComponentsData }) {
	const dispatch = useDispatch();

	const [activeIndex, setActiveIndex] = useState(0);

	const handlePrev = () => {
		setActiveIndex((prevIndex) => Math.max(0, prevIndex - 1));
	};

	const handleNext = () => {
		setActiveIndex((prevIndex) => Math.min(prevIndex + 1, UIComponentsData.length - 1));
	};

	const handleKeyDown = (event) => {
		if (event.key === "ArrowLeft") {
			handlePrev();
		} else if (event.key === "ArrowRight") {
			handleNext();
		}
	};

	useEffect(() => {
		if(UIComponentsData?.length > 0){
			const activeComponentData = UIComponentsData?.length > 0 && UIComponentsData[activeIndex]
				? UIComponentsData[activeIndex]
				: null

			dispatch(setActiveComponentState(activeComponentData));
		}
	}, [activeIndex, UIComponentsData, dispatch])

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div className="flex items-center justify-center">
			<button
				className="w-10 h-10 rounded-full"
				disabled={activeIndex === 0}
				onClick={handlePrev}
			>
				<ChevronLeftIcon className={`w-10 h-10`} />
			</button>
			<button
				className="w-10 h-10 rounded-full"
				disabled={activeIndex === UIComponentsData.length - 1}
				onClick={handleNext}
			>
				<ChevronRightIcon className={`w-10 h-10`} />
			</button>
		</div>
	)
}

export default function UIComponentQuickActionController() {

	const {
		data: UIComponentsData,
		isLoading: UIComponentsIsLoading,
		error: UIComponentsFetchError,
	} = useGetUIComponentsQuery();

	return (
		<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white rounded-full p-4 mb-8">
			{UIComponentsIsLoading && <div>Loading UI Components</div>}
			{!UIComponentsIsLoading && UIComponentsFetchError && (
				<div>UI Components Fetch Error</div>
			)}

			{!UIComponentsIsLoading && !UIComponentsFetchError && (
				<div className={`flex items-center gap-x-4`}>
					{ UIComponentsData?.length > 0 && (
						<div className={`flex items-center`}>
							<ComponentSwitchPreviousAndNext UIComponentsData={UIComponentsData} />

							<button>
								<MagnifyingGlassIcon className={`w-10 h-10`} />
							</button>
						</div>
					)}

					<Link href={`/ui-components/create`}>
						<PlusIcon className={`w-10 h-10`} />
					</Link>

					<button>
						<PencilIcon className={`w-8 h-8`} />
					</button>
				</div>
			)}
		</div>
	);
}
