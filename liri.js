
var fs = require("fs")
fs.readFileAsync = function(filename) {
  return new Promise(function(resolve, reject) {
    try {
      fs.readFile(filename, "utf8", function(err, data) {
        if (err) { reject(err) } else { resolve(data) }
      })
    } catch (err) {
      reject(err)
    }
  })
}

var Twitter = require("twitter")
var Spotify = require("node-spotify-api")

var keys = require("./keys.js")
var utils = require("./utils.js")
var omdb = require("./omdb.js")

var TwitterClient = new Twitter(keys.twitter)
var SpotifyClient = new Spotify(keys.spotify)

function DisplaySong(response) {
  var artists = []
  response.album.artists.forEach((a) => {
    artists.push(a.name)
  })
  console.log("Artist/s: " + artists.join(", "))
  console.log("Song: " + response.name)
  console.log("Album: " + response.album.name)
  console.log(response.external_urls.spotify)
}

function HandleCommand(cmd, arg) {
  switch (cmd) {
    case "my-tweets":
      return TwitterClient.get("statuses/user_timeline", {user_id: "zQLX28gZYmzs9PP"})
        .then((tweets, response) => tweets)
        .then((tweets) => {
          for (var i = 0; i < tweets.length; i++) {
            var t = tweets[i]
            console.log("At " + t.created_at + ", @" + t.user.screen_name + " said: `" + t.text + "`")
          }
        })
    case "spotify-this-song":
      if (arg === undefined) {
        return SpotifyClient.request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
          .then((response) => DisplaySong(response))
          .catch((err) => console.error(err))
      } else {
        return SpotifyClient.search({type: "track", query: arg})
          .then((response) => DisplaySong(response.tracks.items[0]))
          .catch((err) => console.error(err))
      }
    case "movie-this":
      if (arg === undefined) {
        return omdb.Fallback()
          .then((body) => omdb.DisplayMovie(body))
      } else {
        return omdb.Search(arg)
          .then((body) => omdb.DisplayMovie(body))
      }
    case "do-what-it-says":
      // Probably over-complicated sequential Promise resolution
      return fs.readFileAsync("random.txt")
        .then((data) => data.split("\n"))
        .then((cmds) => cmds.filter(c => c.length > 0))
        .then((cmds) => cmds.filter(c => c.split(",")[0] !== "do-what-it-says")) // Prevent infinite loops
        .then((cmds) => {
          var pairs = []
          cmds.forEach((c) => pairs.push(c.split(",")))
          return pairs
        })
        .then((pairs) => {
          var p = Promise.resolve(pairs)
          for (var i = 0; i < pairs.length; i++) {
            p = p.then((pairs) => {
              var pair = pairs[0]
              console.log("\n" + pair.join(" "))
              return HandleCommand(pair[0], pair[1])
                .then(() => pairs.slice(1))
            })
          }
        })
    default:
      return Promise.resolve("LIRI does not understand `" + cmd + "`.")
        .then((t) => console.log(t))
  }
}

var cmd = process.argv[2]
var arg = process.argv[3]

HandleCommand(cmd, arg)
