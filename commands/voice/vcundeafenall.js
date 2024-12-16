const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'vcundeafenall',
    category: 'voice',
    run: async (client, message, args) => {

        if (!message.member.permissions.has('DEAFEN_MEMBERS')) {
            const error = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `You must have \`Deafen members\` permission to use this command.`
                );
            return message.channel.send({ embeds: [error] });
        }
        if (!message.guild.me.permissions.has('DEAFEN_MEMBERS')) {
            const error = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `I must have \`Deafen members\` permission to use this command.`
                );
            return message.channel.send({ embeds: [error] });
        }
        if (!message.member.voice.channel) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `You must be connected to a voice channel first.`
                        )
                ]
            });
        }
        let own = message.author.id == message.guild.ownerId
        if (
            !own &&
            message.member.roles.highest.position <=
                message.guild.me.roles.highest.position
        ) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `<:cross:1317733546261217300> | You must have a higher role than me to use this command.`
                        )
                ]
            })
        }
        try {
            let i = 0;
            message.member.voice.channel.members.forEach(async (member) => {
                i++;
                await member.voice.setDeaf(false,`${message.author.tag} | ${message.author.id}`);
                await client.util.sleep(1000); // Adjust delay if needed
            });
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:tick:1317818894546898985> | Successfully Undeafened ${i} Members in ${message.member.voice.channel}!`
                        )
                ]
            });
        } catch (err) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `I don't have the required permissions to undeafen members.`
                        )
                ]
            });
        }
    }
};
