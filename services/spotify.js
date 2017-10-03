var utils = require("../utils.js")
var Spotify = require("node-spotify-api")
var keys = require("../keys.js")
var SpotifyClient = new Spotify(keys.spotify)

module.exports = {
  Search: function(title) {
    return SpotifyClient.search({type: "track", query: title})
          .catch((err) => console.error(err))
  },
  Fallback: function() {
    return SpotifyClient.request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
      .catch((err) => console.error(err))
  },
  DisplaySong: function(response) {
    var artists = []
    response.album.artists.forEach((a) => {
      artists.push(a.name)
    })
    utils.Log("Artist/s: " + artists.join(", "))
    utils.Log("Song: " + response.name)
    utils.Log("Album: " + response.album.name)
    utils.Log(response.external_urls.spotify)
  },
}
