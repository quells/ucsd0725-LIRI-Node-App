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
    console.log("Artist/s: " + artists.join(", "))
    console.log("Song: " + response.name)
    console.log("Album: " + response.album.name)
    console.log(response.external_urls.spotify)
  },
}
