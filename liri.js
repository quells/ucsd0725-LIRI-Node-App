
var twitter = require("./services/twitter.js")
var spotify = require("./services/spotify.js")
var omdb = require("./services/omdb.js")

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

function HandleCommand(cmd, arg) {
  switch (cmd) {
    case "my-tweets":
      return twitter.Statuses("zQLX28gZYmzs9PP")
        .then((tweets) => twitter.DisplayTweets(tweets))
    case "spotify-this-song":
      if (arg === undefined) {
        return spotify.Fallback()
          .then((response) => spotify.DisplaySong(response))
      } else {
        return spotify.Search(arg)
          .then((response) => spotify.DisplaySong(response.tracks.items[0]))
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
