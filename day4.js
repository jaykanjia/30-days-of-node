const { resolve } = require("path");

function resolvePath(relativePath) {
	// Implementation
	const absPath = resolve(relativePath);
	console.log(absPath);
}

resolvePath("../project/folder/file.txt"); // Expected Output: Resolved Path: /Users/username/project/folder/file.txt

resolvePath("nonexistent-folder/file.txt"); // Expected Output: Resolved Path: /Users/username/nonexistent-folder/file.txt
