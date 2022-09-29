module.exports = (client, type, guild, user) => {
    switch (type) {
        case 'newTicket': {
            return console.log(`${user.username} az önce ${guild.name} sunucusunda bir bilet oluşturdu`);
        }

        case 'closeTicket': {//pasador code
            return console.log(`${user.username} az önce ${guild.name} sunucusundaki bir bileti kapattı`);
        }//pasador code

        case 'reopenTicket': {
            return console.log(`${user.username}, ${guild.name} sunucusunda bir bileti yeniden açtı`);
        }

        case 'deleteTicket': {
            return console.log(`${user.username} az önce ${guild.name} sunucusundaki bir bileti sildi`);
        }

        case 'saveTicket': {
            return console.log(`${user.username} az önce ${guild.name} sunucusuna bir bilet kaydetti`);
        }
    }//pasador code
};