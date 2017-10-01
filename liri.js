
var Twitter = require("twitter")
var Spotify = require("node-spotify-api")

var twitterKeys = require("./keys.js")
//var client = new Twitter(twitterKeys)

var omdb = require("./omdb.js")

var cmd = process.argv[2]
var arg = process.argv[3]

switch (cmd) {
  case "my-tweets":
    console.log("twitter")
    break
  case "spotify-this-song":
    console.log("spotify")
    break
  case "movie-this":
    if (arg === undefined) {
        omdb.Fallback()
    } else {
        omdb.Search(arg, omdb.DisplayMovie)
    }
    break
  case "do-what-it-says":
    console.log("random")
    break
  default:
    console.log("LIRI does not understand `" + cmd + "`.")
    break
}

