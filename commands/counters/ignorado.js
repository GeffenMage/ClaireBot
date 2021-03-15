const { isDatabaseFileEmpty, isUserRegistered, updateDatabaseFile } = require('../../functions/helpers.js');
const { UserEntry } = require('../../models/UserEntry');
const db = require('../../db.json');

module.exports = {
    name: 'ignorado',
    aliases: [],
    usage: '@Usuario',
    description: 'Incrementa a quantidaded de vezes que o usuário marcado ou autor do comando foi ignorado(a)',
    cooldown: 10,
    // eslint-disable-next-line no-unused-vars
    execute(msg, _args) {
        let user = msg.mentions.users.first();
        let times = 0;
        let reply = '';

        if(user == null || user == undefined) user = msg.author;

        if(isDatabaseFileEmpty() || !isUserRegistered(user.id)) {
            const nUser = new UserEntry(user.id);
            times = ++nUser.ignorado;
            db.users.push(nUser);
        }
        else {
            const idx = db.users.findIndex(usr => usr.uid == user.id);
            const entry = db.users[idx];

            times = ++entry.ignorado;
            db.users[idx] = entry;
        }

        updateDatabaseFile(db);

        if (times > 1) {
            reply = `<@${user.id}> foi ignorado(a) ${times} vezes`;
        }
        else{
            reply = `<@${user.id}> foi ignorado(a) ${times} vez`;
        }

        msg.channel.send(reply);
    },
};