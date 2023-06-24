import { NextResponse } from 'next/server'
import fs from 'fs';
import path from 'path';


export async function GET(request) {
	try {
		const searchDirectory = 'components/UIComponents';
		const fileExtensions = ['.tsx', '.jsx', '.js', '.html'];
		const fileList = [];

		const searchFiles = (currentDir) => {
			const files = fs.readdirSync(currentDir);
			files.forEach((file) => {
				const filePath = path.join(currentDir, file);
				const stats = fs.statSync(filePath);

				if (stats.isDirectory()) {
					searchFiles(filePath);
				} else {
					const fileExtension = path.extname(file);
					if (fileExtensions.includes(fileExtension)) {
						fileList.push({
							directory: currentDir,
							fileName: file,
							filePath: path.relative(searchDirectory, filePath),
						});
					}
				}
			});
		};

		searchFiles(searchDirectory);

		return NextResponse.json({
			data: fileList
		})
	}catch (e) {
		return NextResponse.json({ error: e?.message || 'Failed to fetch components.' })
	}
}

export async function POST(request) {
	try {
		const reqData = await request.text();
		const { filePath, fileCode } = JSON.parse(reqData)

		console.log('req data')
		console.log(reqData)

		if (!filePath || !fileCode) {
			throw new Error('You must provide both filePath and fileCode.');
		}

		// Create the component file
		const componentPath = path.join(process.cwd(), 'components', 'UIComponents', `${filePath}`);

		// Extract the directory path from the component path
		const componentDirectory = path.dirname(componentPath);

		// Check if the component file already exists
		if (fs.existsSync(componentPath)) {
			throw new Error('Component file already exists.');
		}

		// Create the directory if it doesn't exist
		fs.mkdirSync(componentDirectory, { recursive: true });

		// Write the file code to the component file
		await fs.writeFileSync(componentPath, fileCode);

		return NextResponse.json({ success: true });
	} catch (e) {
		return NextResponse.json({ error: e?.message || 'Failed to create component.' });
	}
}
