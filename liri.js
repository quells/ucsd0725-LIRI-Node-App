
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

var twitterKeys = require("./keys.js")
//var client = new Twitter(twitterKeys)

var utils = require("./utils.js")
var omdb = require("./omdb.js")

function HandleCommand(cmd, arg) {
  switch (cmd) {
    case "my-tweets":
      return Promise.resolve("twitter")
        .then((t) => console.log(t))
    case "spotify-this-song":
      return Promise.resolve("spotify")
        .then((t) => console.log(t))
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
              var pairs = pairs.slice(1)
              console.log("\n" + pair.join(" "))
              return HandleCommand(pair[0], pair[1])
                .then(() => pairs)
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
