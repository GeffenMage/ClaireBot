const { isUserRegistered, displayUserData } = require('../../functions/helpers.js');
const { UserEntry } = require('../../models/UserEntry');
const db = require('../../db.json');

module.exports = {
    name: 'status',
    aliases: [],
    usage: '@Usuario',
    description: 'Exibe todas as informações salvas sobre o usuário marcado ou o autor do comando',
    cooldown: 10,
    // eslint-disable-next-line no-unused-vars
    execute(msg, _args) {
        let user = msg.mentions.users.first();
        let reply = '';

        if(user == null || user == undefined) user = msg.author;

        if(!isUserRegistered(user.id)) db.users.push(new UserEntry(user.id));

        const entry = db.users.find(usr => usr.uid == user.id);

        reply = displayUserData(user.username, entry);

        msg.channel.send(reply);
    },
};