const {Twitch} = require('./index');

let twitch = new Twitch("dmuxwxozzidsekncuvg8nvocopx28t");
twitch.topStreams("Destiny")
.then((response) => {
  console.log(JSON.stringify(response, null, 2));
});
