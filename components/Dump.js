import classNames from "@/lib/classNames";

export default function Dump({ title, data, className }){
	return (
		<div className={classNames(
			`p-4 bg-red-50`,
			`${className}`
		)}>
			{ title && <h1>{ title }</h1> }

			<pre>{JSON.stringify(data, null, 4)}</pre>
		</div>
	)
}