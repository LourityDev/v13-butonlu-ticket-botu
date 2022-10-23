const chalk = require('chalk');
const moment = require('moment');


module.exports = client => {//lourity code
var oyun = [
        `Lourity Code`
    ];

    setInterval(function() {//louirty code

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], "" );
        }, 2 * 4000 );
  
  client.user.setStatus("dnd");
}; 
