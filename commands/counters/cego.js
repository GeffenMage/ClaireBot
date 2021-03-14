const { isDatabaseFileEmpty, isUserRegistered, updateDatabaseFile } = require('../../functions/helpers.js');
const { UserEntry } = require('../../models/UserEntry');
const db = require('../../db.json');

module.exports = {
    name: 'cego',
    description: '',
    cooldown: 10,
    // eslint-disable-next-line no-unused-vars
    execute(msg, _args) {
        const user = msg.mentions.users.first();
        let times = 0;
        let reply = '';

        if(isDatabaseFileEmpty() || !isUserRegistered(user.id)) {
            const nUser = new UserEntry(user.id);
            times = ++nUser.cego;
            db.users.push(nUser);
        }
        else {
            const idx = db.users.findIndex(usr => usr.uid == user.id);
            const entry = db.users[idx];

            times = ++entry.cego;
            db.users[idx] = entry;
        }

        updateDatabaseFile(db);

        if (times > 1) {
            reply = `${user.username} foi cego ${times} vezes`;
        }
        else{
            reply = `${user.username} foi cego ${times} vez`;
        }

        msg.channel.send(reply);
    },
};