import {PhotoIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import {useCreateUIComponentMutation} from "@/store/services/uiComponentApi";
import FormAlertMessage from "@/components/UILayout/FormAlertMessage";

export default function UIComponentCreatePage(){
	const [filePath, setFilePath] = useState('')
	const [fileCode, setFileCode] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const [createUIComponent, {
		isLoading: UIComponentIsCreating,
		error: UIComponentCreateError
	}] = useCreateUIComponentMutation()

	async function handleComponentCreateSubmit(e) {
		e.preventDefault()

		if(!filePath || !fileCode){
			setErrorMessage("Both filePath and fileCode are required." )
		}

		const UIComponentCreateResponse = await createUIComponent({
			filePath,
			fileCode
		})

		if(UIComponentCreateResponse?.data?.success){
			setSuccessMessage("Your UI Component has been added.")
			setErrorMessage("")
			setFilePath("")
			setFileCode("")
		}else if(UIComponentCreateResponse?.data?.error){
			setErrorMessage(UIComponentCreateResponse?.data?.error)
		}else{
			setErrorMessage("")
			setSuccessMessage("")
		}
	}

	return (
		<div className={`lg:w-3/6 md:w-3/6 mx-auto py-16`}>
			<div className="px-4 sm:px-0 mb-6 text-center">
				<h2 className="text-base font-semibold leading-7 text-gray-900">Create New UI Component</h2>
				<p className="mt-1 text-sm leading-6 text-gray-600">
					This information will be displayed publicly so be careful what you share.
				</p>
			</div>

			<form
				onSubmit={handleComponentCreateSubmit}
				className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
				<div className="px-4 py-6 sm:p-8">
					<div className="grid grid-cols-1 gap-x-6 gap-y-8">
						<div className="col-span-1">
							<label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
								File Path

								<div className={`text-xs text-gray-400 my-2`}>
									@/components/UIComponents/
								</div>
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
									<input
										type="text"
										name="filePath"
										id="filePath"
										className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="MyDirectory/MyComponent.tsx"
										value={filePath}
										onChange={e => setFilePath(e.target.value)}
									/>
								</div>
							</div>
						</div>

						<div className="col-span-full">
							<label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
								Code
							</label>
							<div className="mt-2">
									<textarea
										id="fileCode"
										name="fileCode"
										rows={5}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										defaultValue={fileCode}
										onChange={e => setFileCode(e.target.value)}
									/>
							</div>
							<p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
						</div>

						<div className="col-span-full">
							<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
								Cover photo
							</label>
							<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
								<div className="text-center">
									<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
									<div className="mt-4 flex text-sm leading-6 text-gray-600">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
										>
											<span>Upload a file</span>
											<input id="file-upload" name="file-upload" type="file" className="sr-only" />
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{ errorMessage && (
					<FormAlertMessage
						type={`error`}
						message={errorMessage}
					/>
				)}

				{ !errorMessage && successMessage && (
					<FormAlertMessage
						type={`success`}
						message={successMessage}
					/>
				)}

				<div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
					<button type="button" className="text-sm font-semibold leading-6 text-gray-900">
						Cancel
					</button>
					<button
						type={UIComponentIsCreating ? 'button': 'submit'}
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						disabled={UIComponentIsCreating}
					>
						{ UIComponentIsCreating ? 'wait ...' : 'Save' }
					</button>
				</div>
			</form>
		</div>
	)
}