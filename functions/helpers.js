const fs = require('fs');
const db = require('../db.json');

function updateDatabaseFile(nDb) {
	fs.writeFileSync(process.env.DATA_FILE_PATH, JSON.stringify(nDb));
}

function isDatabaseFileEmpty() {
	return db.users.length == 0 ? true : false;
}

function isUserRegistered(userId) {
	return db.users.find((user) => user.uid == userId) != undefined
		? true
		: false;
}

function displayUserData(username, { cego, criminoso, solado }) {
	const res = `${username}: \n 
    Foi cego ${cego} vezes \n 
    Foi criminoso ${criminoso} vezes \n 
    Foi solado ${solado} vezes`;

    return res;
}

module.exports = {
	updateDatabaseFile,
	isDatabaseFileEmpty,
	isUserRegistered,
    displayUserData,
};
