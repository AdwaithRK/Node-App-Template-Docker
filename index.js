#!/usr/bin/env node
const fs = require("fs-extra");
const { exec } = require("child_process");

const projectName = process.argv[2];
const CURR_DIR = process.cwd();
const templatePath = `${__dirname}/create-node-app`;
const projectPath = `${CURR_DIR}/${projectName}`;

if (fs.existsSync(projectPath)) {
    console.log(`Folder already exists in the path.`);
    process.exit(0);
} else {
    fs.mkdirSync(projectPath);
}

fs.copy(templatePath, projectPath)
    .then(() => {
        console.log("Template created successfully!\n");
        console.log("Dependencies are being installed...");

        exec(`cd ${projectPath} && npm install`, (err, stdout, stderr) => {
            if (err) {
                console.error("An error occurred while installing dependencies:");
                console.error(err);
            } else {
                console.log(`stdout: ${stdout}`);
                //console.error(`stderr: ${stderr}`);
            }
        });
    })
    .catch((err) => {
        console.error("An error occurred while creating the template:");
        console.error(err);
    });
