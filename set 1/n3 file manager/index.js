
// Name: Martin Angel Padon
// Section: IV-BSIT B
// Activity: N3 - File Manager with fs and path
// Date: November 21, 2026

const fs = require("fs");
const path = require("path");

// Folder where all text files will be stored
const filesFolder = path.join(__dirname, "files");

// Create files folder if it does not exist
if (!fs.existsSync(filesFolder)) {
    fs.mkdirSync(filesFolder);
}

// Get the complete file path
function getFilePath(filename) {
    if (!filename || path.basename(filename) !== filename) {
        throw new Error("Invalid file name.");
    }

    return path.join(filesFolder, filename);
}

// CREATE FILE
function createFile(filename, content) {
    const filePath = getFilePath(filename);

    if (fs.existsSync(filePath)) {
        console.log("File already exists.");
        return;
    }

    fs.writeFileSync(filePath, content);
    console.log("File created successfully:", filename);
}

// READ FILE
function readFile(filename) {
    const filePath = getFilePath(filename);

    if (!fs.existsSync(filePath)) {
        console.log("Error: File does not exist.");
        return;
    }

    const content = fs.readFileSync(filePath, "utf8");

    console.log("\nFile Content:");
    console.log(content);
}

// UPDATE FILE (Append text)
function updateFile(filename, content) {
    const filePath = getFilePath(filename);

    if (!fs.existsSync(filePath)) {
        console.log("Error: File does not exist.");
        return;
    }

    fs.appendFileSync(filePath, "\n" + content);
    console.log("File updated successfully:", filename);
}

// DELETE FILE
function deleteFile(filename) {
    const filePath = getFilePath(filename);

    if (!fs.existsSync(filePath)) {
        console.log("Error: File does not exist.");
        return;
    }

    fs.unlinkSync(filePath);
    console.log("File deleted successfully:", filename);
}

// LIST ALL FILES
function listFiles() {
    const filenames = fs.readdirSync(filesFolder);

    if (filenames.length === 0) {
        console.log("No files found.");
        return;
    }

    console.log("\n===== FILE LIST =====");

    filenames.forEach((filename) => {
        const filePath = path.join(filesFolder, filename);
        const content = fs.readFileSync(filePath, "utf8");

        console.log("\nFull Path:", filePath);
        console.log("File Name:", path.basename(filename));
        console.log("Extension:", path.extname(filename));
        console.log("Contents:", content);
    });
}

// GET COMMANDS FROM TERMINAL
const command = process.argv[2];
const filename = process.argv[3];
const content = process.argv.slice(4).join(" ");

try {
    switch (command) {
        case "create":
            if (!filename || !content) {
                console.log('Usage: node index.js create notes.txt "Hello"');
            } else {
                createFile(filename, content);
            }
            break;

        case "read":
            if (!filename) {
                console.log("Please provide a file name.");
            } else {
                readFile(filename);
            }
            break;

        case "update":
            if (!filename || !content) {
                console.log('Usage: node index.js update notes.txt "New text"');
            } else {
                updateFile(filename, content);
            }
            break;

        case "delete":
            if (!filename) {
                console.log("Please provide a file name.");
            } else {
                deleteFile(filename);
            }
            break;

        case "list":
            listFiles();
            break;

        default:
            console.log("Unknown command.");
            console.log("Available commands: create, read, update, delete, list");
    }
} catch (error) {
    console.log("Error:", error.message);
}
