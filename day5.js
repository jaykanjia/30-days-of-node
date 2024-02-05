const path = require("path");

function checkFileExtension(filePath, expectedExtension) {
	// Implementation
	const ext = path.extname(filePath);
	if (expectedExtension === ext) {
		return console.log(`File has the expected extension: ${ext}`);
	}
	return console.log(
		`File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${ext}`
	);
}

checkFileExtension("test-files/file1.txt", ".txt");
// Expected Output: File has the expected extension: .txt

checkFileExtension("test-files/image.png", ".jpg");
// Expected Output: File does not have the expected extension. Expected: .jpg, Actual: .png
