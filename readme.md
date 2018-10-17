#Twitch

A simple javascript library for accessing the Twitch API.

```
new Twitch(client_id).authToken(auth_token);
```

## Responses:

All method responses come back in a wrapper that looks like this:

```
{
	"success": true,
	"status":200,
	"requiresReauth": false,
  	"message": "",
  	"data": {}
}
```
The `data` object contains the actual response from the call, where the rest of the info is simply metadata about the http transaction.


## Methods:


* `topStreams(game = null)` : returns a list of the top streams on Twitch, or the top streams for the specified game.
* `topGames(count)` : Returns a list of the top games on Twitch currently.
* `searchForChannel(query)` : Returns the top channel matching the search criteria provided.
* `streamForChannel(channel)` : Returns a stream associated with the supplied channel.

### Requiring Auth:

* `authToken(token)` : Specify an auth token to use for all subsequent calls to this Twitch object. 
* `followedStreams()` : Returns a list of streams that you follow that are live in order of their current viewership.
* `user()` : Returns a user object that represents your account on Twitch.
* `myChannel()` : Returns a Channel object that represents your channel.
* `updateChannel(channel, {status, game})` : Update your stream status and/or game.

