import {InformationCircleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function FormAlertMessage({ message }){
	return (
		<div className="rounded-md bg-blue-50 p-4">
			<div className="flex">
				<div className="flex-shrink-0">
					<InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
				</div>
				<div className="ml-3 flex-1 md:flex md:justify-between">
					<p className="text-sm text-blue-700">{ message }</p>
					<p className="mt-3 text-sm md:ml-6 md:mt-0">
						<Link href="/" className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
							Details
							<span aria-hidden="true"> &rarr;</span>
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}