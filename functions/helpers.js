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

function displayUserData(uid, { cego, criminoso, solado, fragmentado, surdo, ignorado }) {
	const res = `<@${uid}>\n
    Foi **cego(a)** ${cego} vezes\n
    Foi **criminoso(a)** ${criminoso} vezes\n
    Foi **solado(a)** ${solado} vezes\n
	Foi **fragmentado(a)** ${fragmentado} vezes\n
	Foi **surdo(a)** ${surdo} vezes\n
	Foi **ignorado(a)** ${ignorado } vezes`;

    return res;
}

module.exports = {
	updateDatabaseFile,
	isDatabaseFileEmpty,
	isUserRegistered,
    displayUserData,
};
