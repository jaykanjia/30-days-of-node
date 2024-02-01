const fs = require("fs");

function readFileContent(filePath) {
	fs.readFile(filePath, function (err, data) {
		if (err) {
			console.log("Error reading file:", err.message);
		} else {
			console.log(data.toString());
		}
	});
}

// Test Cases:

readFileContent("test-files/file1.txt");
// Expected Output: Content of file1.txt

readFileContent("test-files/empty-file.txt");
// Expected Output: (empty string)

readFileContent("test-files/nonexistent-file.txt");
// Expected Output: Error reading file: ENOENT: no such file or directory...
