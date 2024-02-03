const { exec } = require("child_process");

function executeCommand(command) {
	// Implementation
	exec(command, (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err.message}`);
			return;
		}
		console.log(`Command Output:\n${stdout}`);
		if (stderr) console.error(`stderr: ${stderr}`);
	});
}

executeCommand("ls -a");
// Expected Output: (output of ls -la)

executeCommand('echo "Hello, Node.js!"');
// Expected Output: Hello, Node.js!
