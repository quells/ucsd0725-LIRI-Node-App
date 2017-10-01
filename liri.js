
const fs = require("fs")

var Twitter = require("twitter")
var Spotify = require("node-spotify-api")

var twitterKeys = require("./keys.js")
//var client = new Twitter(twitterKeys)

var omdb = require("./omdb.js")

var cmd = process.argv[2]
var arg = process.argv[3]

function HandleCommand(cmd, arg) {
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
      fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) { console.error(err); return }
        console.log(data.split("\n"))
      })
      break
    default:
      console.log("LIRI does not understand `" + cmd + "`.")
      break
  }
}
