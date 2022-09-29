const { createWriteStream } = require('fs');
const { MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require('discord.js');

module.exports = async (client, int) => {
    const req = int.customId.split('_')[0];

    client.emit('ticketsLogs', req, int.guild, int.member.user);

    switch (req) {
        case 'createTicket': {
            const selectMenu = new MessageSelectMenu();

            selectMenu.setCustomId('newTicket');
            selectMenu.setPlaceholder('Bilet için bir neden seçin');//pasador code
            selectMenu.addOptions([
                {
                    emoji: '📙',
                    label: 'Diğer',
                    description: 'Sebep yok',
                    value: 'newTicket'
                },
                {
                    emoji: '🙋',
                    label: 'Destek',
                    description: 'Yardım isteyin',
                    value: 'newTicket_Destek'
                },
                {
                    emoji: '🛡️',
                    label: 'Moderasyon',
                    description: 'Ekiple konuşmak',
                    value: 'newTicket_Moderasyon'
                },///Bunları Kopyalayarak Arttıra Bilirsiniz - Pasador
            ]);

            const row = new MessageActionRow().addComponents(selectMenu);//pasador code

            return int.reply({ content: 'Biletin sebebi ne olacak?', components: [row], ephemeral: true });//pasador code
        }

        case 'newTicket': {//pasador code
            const reason = int.values[0].split('_')[1];

            const channel = int.guild.channels.cache.find(x => x.name === `ticket-${int.member.id}`);
//pasador code
            if (!channel) {
                await int.guild.channels.create(`ticket-${int.member.id}`, {//id = kullanıcının idsini verir ismini vermesini isteyenler id yerine username yazsın <3
                    type: 'GUILD_TEXT',
                    topic: `Bilet ${int.member.user.username} tarafından oluşturuldu. Sebep: ${reason ? ` (${reason})` : ''} ${new Date(Date.now()).toLocaleString()}`,
                    permissionOverwrites: [
                        {
                            id: int.guild.id,
                            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        },//pasador code
                        {
                            id: int.member.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        },
                        {
                            id: client.user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        }
                    ]
                });

                const channel = int.guild.channels.cache.find(x => x.name === `ticket-${int.member.id}`);
                const ticketEmbed = new MessageEmbed();
//pasador code
                ticketEmbed.setColor('GREEN');
                ticketEmbed.setAuthor(`Biletiniz başarıyla oluşturuldu ${int.member.user.username} ${reason ? ` (${reason})` : ''} ✅`);
                ticketEmbed.setDescription('*Mevcut bileti kapatmak için aşağıdaki tepkiye tıklayın, dikkat geri dönemeyeceksiniz!*');
                channel.send(`<@${int.member.id}>`);
                const closeButton = new MessageButton();
//pasador code
                closeButton.setStyle('DANGER');
                closeButton.setLabel('Bu bileti kapat');
                closeButton.setCustomId(`closeTicket_${int.member.id}`);

                const row = new MessageActionRow().addComponents(closeButton);

                await channel.send({ embeds: [ticketEmbed], components: [row] });

                return int.update({ content: `Biletiniz Açıldı <@${int.member.id}> <#${channel.id}> ✅`, components: [], ephemeral: true });
            } else {
                return int.update({ content: `Zaten açık bir biletiniz var <#${channel.id}> ❌`, components: [], ephemeral: true });
            }
        }//pasador code

        case 'closeTicket': {
            const channel = int.guild.channels.cache.get(int.channelId);

            await channel.edit({
                permissionOverwrites: [
                    {
                        id: int.guild.id,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: int.customId.split('_')[1],//pasador code
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: client.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ]
            });

            const ticketEmbed = new MessageEmbed();

            ticketEmbed.setColor('RED');//pasador code
            ticketEmbed.setAuthor(`${int.member.user.username} bu bileti kapatmaya karar verdi ❌`);
            ticketEmbed.setDescription('*Bileti kalıcı olarak silmek veya bileti yeniden açmak için aşağıdaki butona tıklayın.*');

            const reopenButton = new MessageButton();

            reopenButton.setStyle('SUCCESS');
            reopenButton.setLabel('Bu bileti yeniden aç');
            reopenButton.setCustomId(`reopenTicket_${int.customId.split('_')[1]}`);

            const saveButton = new MessageButton();

            saveButton.setStyle('SUCCESS');//pasador code
            saveButton.setLabel('Bu bileti kaydet');
            saveButton.setCustomId(`saveTicket_${int.customId.split('_')[1]}`);

            const deleteButton = new MessageButton();

            deleteButton.setStyle('DANGER');
            deleteButton.setLabel('Bu bileti sil');
            deleteButton.setCustomId('deleteTicket');

            const row = new MessageActionRow().addComponents(reopenButton, saveButton, deleteButton);

            return int.reply({ embeds: [ticketEmbed], components: [row] });
        }

        case 'reopenTicket': {
            const channel = int.guild.channels.cache.get(int.channelId);

            await channel.edit({
                permissionOverwrites: [
                    {//pasador code
                        id: int.guild.id,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: int.customId.split('_')[1],
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: client.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ]
            });

            const ticketEmbed = new MessageEmbed();//pasador code

            ticketEmbed.setColor('GREEN');
            ticketEmbed.setAuthor(`Bilet yeniden açıldı ✅`);
            ticketEmbed.setDescription('*Mevcut bileti kapatmak için aşağıdaki tepkiye tıklayın, dikkat geri dönemeyeceksiniz!*');

            const closeButton = new MessageButton();

            closeButton.setStyle('DANGER');
            closeButton.setLabel('Bu bileti kapat');
            closeButton.setCustomId(`closeTicket_${int.customId.split('_')[1]}`);

            const row = new MessageActionRow().addComponents(closeButton);

            return int.reply({ embeds: [ticketEmbed], components: [row] });
        }

        case 'deleteTicket': {
            const channel = int.guild.channels.cache.get(int.channelId);
//pasador code
            return channel.delete();
        }

        case 'saveTicket': {
            const channel = int.guild.channels.cache.get(int.channelId);

            await channel.messages.fetch().then(async msg => {
                let messages = msg.filter(msg => msg.author.bot !== true).map(m => {
                    const date = new Date(m.createdTimestamp).toLocaleString();
                    const user = `${m.author.tag}${m.author.id === int.customId.split('_')[1] ? ' (ticket creator)' : ''}`;

                    return `${date} - ${user} : ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`;
                }).reverse().join('\n');

                if (messages.length < 1) messages = 'Bu bilette mesaj yok... garip';

                const ticketID = Date.now();

                const stream = await createWriteStream(`./data/${ticketID}.txt`);

                stream.once('open', () => {
                    stream.write(`Kullanıcı bileti ${int.customId.split('_')[1]} (channel #${channel.name})\n\n`);
                    stream.write(`${messages}\n\nLogs ${new Date(ticketID).toLocaleString()}`);

                    stream.end();//pasador code
                });

                stream.on('finish', () => int.reply({ files: [`./data/${ticketID}.txt`] }));
            });
        }
    }
};