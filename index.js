const fetch = require('isomorphic-fetch');

const TwitchEndpoints = {
  streams:{
    followed:'https://api.twitch.tv/kraken/streams/followed',
    top:'https://api.twitch.tv/kraken/streams'
  },
  search:{
    channels:'https://api.twitch.tv/kraken/search/channels'
  },
  games:{
    top:'https://api.twitch.tv/kraken/games/top'
  },
  user:{
    user:'https://api.twitch.tv/kraken/user'
  },
  channel:{
    my: 'https://api.twitch.tv/kraken/channel'
  },
  channels:{
    update:'https://api.twitch.tv/kraken/channels/'
  }
};

class Twitch {
  constructor(clientId) {
    this.clientId = clientId;
  }
  authToken(token) {
    this.authToken = token;
    return this;
  }
  topStreams(game) {
      const game_query = game ? "&game="+game : "";
      return fetch(TwitchEndpoints.streams.top+"?stream_type=live" + game_query, {
         method:"GET",
         headers: {
          'Client-ID': this.clientId,
          'Accept': 'application/vnd.twitchtv.v5+json'
          }
      })
      .then((response) => {
          var responseObj = {};
          responseObj.success = false;
          responseObj.status = response.status;
          responseObj.requiresReauth = false;
          responseObj.message = "";
          responseObj.data = null;

          if (response.status >= 200 && response.status < 300) {
              responseObj.success = true;
              return response.json()
              .then((json) => {
                  responseObj.data = json;
                  return responseObj;
              });
          } else {
              responseObj.message = "Couldn't get Twitch listings:" + response.status + ":" + response.statusText;
          }
          return responseObj;
      });
  }
  topGames(count) {
    const url = TwitchEndpoints.games.top +"?limit="+(count ? count : 10);
      return fetch(url, {
         method:"GET",
         headers: {
          'Client-ID': this.clientId
          }
      })
      .then((response) => {
          var responseObj = {};
          responseObj.success = false;
          responseObj.status = response.status;
          responseObj.requiresReauth = false;
          responseObj.message = "";
          responseObj.data = null;

          if (response.status >= 200 && response.status < 300) {
              responseObj.success = true;
              return response.json()
              .then((json) => {
                  responseObj.data = json;
                  return responseObj;
              });
          } else {
              responseObj.message = "Couldn't get Twitch games:" + response.status + ":" + response.statusText;
          }
          return responseObj;
      });
  }
  followedStreams() {
      return fetch(TwitchEndpoints.streams.followed, {
         method:"GET",
         headers: {
          'Authorization': 'OAuth ' + this.authToken,
          'Client-ID': this.clientId,
          'Accept': 'application/vnd.twitchtv.v5+json'
          }
      })
      .then((response) => {
          var responseObj = {};
          responseObj.success = false;
          responseObj.status = response.status;
          responseObj.requiresReauth = false;
          responseObj.message = "";
          responseObj.data = null;

          if (response.status >= 200 && response.status < 300) {
              responseObj.success = true;
              return response.json()
              .then((json) => {
                  responseObj.data = json;
                  return responseObj;
              });
          } else if (response.status == 401) {
              responseObj.requiresReauth = true;
              responseObj.message = "We need to re-authorize with Twitch";
          } else {
              responseObj.message = "Couldn't get Twitch listings:" + response.status + ":" + response.statusText;
          }
          return responseObj;
      });
  }
  searchForChannel(query) {
      return fetch(TwitchEndpoints.search.channels + "?query=" + query+"&limit=1", {
         method:"GET",
         headers: {
          'Client-ID': this.clientId,
          'Accept': 'application/vnd.twitchtv.v5+json'
          }
      })
      .then((response) => {
          var responseObj = {};
          responseObj.success = false;
          responseObj.status = response.status;
          responseObj.requiresReauth = false;
          responseObj.message = "";
          responseObj.data = null;

          if (response.status >= 200 && response.status < 300) {
              responseObj.success = true;
              return response.json()
              .then((json) => {
                  responseObj.data = json;
                  return responseObj;
              });
          } else if (response.status == 401) {
              responseObj.requiresReauth = true;
              responseObj.message = "We need to re-authorize with Twitch";
          } else {
              responseObj.message = "Couldn't get Twitch listings:" + response.status + ":" + response.statusText;
          }
          return responseObj;
      });
  }
  streamForChannel(channel, data) {
      return fetch(TwitchEndpoints.streams.top + "?channel=" + channel._id+"&limit=1", {
         method:"GET",
         headers: {
          'Client-ID': this.clientId,
          'Accept': 'application/vnd.twitchtv.v5+json'
          }
      })
      .then((response) => {
          var responseObj = {};
          responseObj.success = false;
          responseObj.status = response.status;
          responseObj.requiresReauth = false;
          responseObj.message = "";
          responseObj.data = null;

          if (response.status >= 200 && response.status < 300) {
              responseObj.success = true;
              return response.json()
              .then((json) => {
                  responseObj.data = json;
                  return responseObj;
              });
          } else if (response.status == 401) {
              responseObj.requiresReauth = true;
              responseObj.message = "We need to re-authorize with Twitch";
          } else {
              responseObj.message = "Couldn't get Twitch listings:" + response.status + ":" + response.statusText;
          }
          return responseObj;
      });
  }
  user() {
      return fetch(TwitchEndpoints.user.user, {
         method:"GET",
         headers: {
           'Authorization': 'OAuth ' + this.authToken,
          'Client-ID': this.clientId,
          'Accept': 'application/vnd.twitchtv.v5+json'
          }
      })
      .then((response) => {
          var responseObj = {};
          responseObj.success = false;
          responseObj.status = response.status;
          responseObj.requiresReauth = false;
          responseObj.message = "";
          responseObj.data = null;

          if (response.status >= 200 && response.status < 300) {
              responseObj.success = true;
              return response.json()
              .then((json) => {
                  responseObj.data = json;
                  return responseObj;
              });
          } else if (response.status == 401) {
              responseObj.requiresReauth = true;
              responseObj.message = "We need to re-authorize with Twitch";
          } else {
              responseObj.message = "Couldn't get Twitch listings:" + response.status + ":" + response.statusText;
          }
          return responseObj;
      });
  }
  myChannel() {
      return fetch(TwitchEndpoints.channel.my, {
         method:"GET",
         headers: {
          'Authorization': 'OAuth ' + this.authToken,
          'Client-ID': this.clientId,
          'Accept': 'application/vnd.twitchtv.v5+json'
          }
      })
      .then((response) => {
          var responseObj = {};
          responseObj.success = false;
          responseObj.status = response.status;
          responseObj.requiresReauth = false;
          responseObj.message = "";
          responseObj.data = null;

          if (response.status >= 200 && response.status < 300) {
              responseObj.success = true;
              return response.json()
              .then((json) => {
                  responseObj.data = json;
                  return responseObj;
              });
          } else if (response.status == 401) {
              responseObj.requiresReauth = true;
              responseObj.message = "We need to re-authorize with Twitch";
          } else {
              responseObj.message = "Couldn't get Twitch listings:" + response.status + ":" + response.statusText;
          }
          return responseObj;
      });
  }
  updateChannel(channel, update) {
    return fetch(TwitchEndpoints.channels.update + channel._id, {
       method:"PUT",
       headers: {
        'Authorization': 'OAuth ' + this.authToken,
        'Client-ID': this.clientId,
        'Accept': 'application/vnd.twitchtv.v5+json',
        "Content-Type": "application/x-www-form-urlencoded"
      },
      json:true,
      body:Object.keys(update)
        .map((key) => `channel[${encodeURIComponent(key)}]=${encodeURIComponent(update[key])}`)
        .join('&')
    }).then((response) => {
        var responseObj = {};
        responseObj.success = false;
        responseObj.status = response.status;
        responseObj.requiresReauth = false;
        responseObj.message = "";
        responseObj.data = null;

        if (response.status >= 200 && response.status < 300) {
            responseObj.success = true;
            return response.json()
            .then((json) => {
                responseObj.data = json;
                return responseObj;
            });
        } else if (response.status == 401) {
            responseObj.requiresReauth = true;
            responseObj.message = "We need to re-authorize with Twitch";
        } else {
            responseObj.message = "Couldn't get Twitch listings:" + response.status + ":" + response.statusText;
        }
        return responseObj;
    });
  }
}

module.exports = {Twitch};
