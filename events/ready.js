const chalk = require('chalk');
const moment = require('moment');


module.exports = client => {//pasador code
var oyun = [
        `Pasador Code`
    ];

    setInterval(function() {//pasador code

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], "" );
        }, 2 * 4000 );
  
  client.user.setStatus("dnd");
}; 