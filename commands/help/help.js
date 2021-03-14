const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'Lista todos os comandos ou exibe informações sobre um comando específico',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Comandos disponíveis:');
			data.push(commands.map((command) => command.name).join(', '));
			data.push(
				`\nVoce pode enviar \`${prefix} help [command name]\` para obter informações sobre um comando específico!`,
			);

			return message.author
				.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Te enviei uma mensagem com todos os comandos disponíveis!');
				})
				.catch((error) => {
					console.error(
						`Could not send help DM to ${message.author.tag}.\n`,
						error,
					);
					message.reply(
						'Não consegui te enviar uma mensagem, suas dm\'s estão habilitadas?',
					);
				});
		}

		const name = args[0].toLowerCase();
		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Comando inválido!');
		}

		data.push(`**Nome:** ${command.name}`);

		if (command.aliases)
			data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description)
			data.push(`**Descrição:** ${command.description}`);
		if (command.usage)
			data.push(`**Uso:** ${prefix} ${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} segundo(s)`);

		message.channel.send(data, { split: true });
	},
};
