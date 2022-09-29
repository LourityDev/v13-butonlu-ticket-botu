const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {//lourity code
    name: 'setup',

    execute(client, message) {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return message.channel.send('Bu komutu kullanmak için **mesajları yönet** iznine sahip olmanız gerekir ❌');
        }
//lourity code
        const setupEmbed = new MessageEmbed();

        setupEmbed.setColor('GREEN');
        setupEmbed.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        setupEmbed.setAuthor('Bilet sistemi');
        setupEmbed.setDescription('**Bir bilet oluşturmak için aşağıdaki reaksiyona tıklayın 🤝**');//lourity code
        setupEmbed.setFooter(`Destek Ekipi ile konuşmanız için yeni bir kanal oluşturulacak!`)//lourity code

        const ticketButton = new MessageButton();//lourity code

        ticketButton.setEmoji('🔓');//lourity code
        ticketButton.setStyle('SUCCESS');
        ticketButton.setLabel('Bilet Oluştur');
        ticketButton.setCustomId('createTicket');

        const row = new MessageActionRow().addComponents(ticketButton);

        message.channel.send({ embeds: [setupEmbed], components: [row] });//lourity code
    },
};//lourity code




//lourity code
//lourity code
//lourity code
//lourity code
//lourity code
//lourity code
