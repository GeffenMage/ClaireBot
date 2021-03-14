const { isUserRegistered, displayUserData } = require('../../functions/helpers.js');
const { UserEntry } = require('../../models/UserEntry');
const db = require('../../db.json');

module.exports = {
    name: 'status',
    description: '',
    cooldown: 10,
    // eslint-disable-next-line no-unused-vars
    execute(msg, _args) {
        const user = msg.mentions.users.first();
        let reply = '';

        if(!isUserRegistered(user.id)) db.users.push(new UserEntry(user.id));

        const entry = db.users.find(usr => usr.uid == user.id);

        reply = displayUserData(user.username, entry);

        msg.channel.send(reply);
    },
};