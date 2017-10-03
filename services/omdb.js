
var request = require("request-promise-native")
var utils = require("../utils.js")

var api_key = "40e9cece"
var url = "https://www.omdbapi.com/?apikey=" + api_key

module.exports = {
  Search: function(title) {
    var q = url + "&t=" + utils.WithPluses(title)
    return request(q)
      .catch((err) => console.error(err))
      .then((body) => JSON.parse(body))
  },

  Fallback: function() {
    return this.Search("Mr Nobody")
  },

  DisplayMovie: function(body) {
    if (body.Response === "True") {
      console.log(body.Title + " (" + body.Year + ")")

      var rtFound = false
      for (var i = 0; i < body.Ratings.length; i++) {
        var rating = body.Ratings[i]
        if (rating.Source === "Rotten Tomatoes") {
          console.log("Rotten Tomatoes: " + rating.Value)
          rtFound = true
          break
        }
      }
      if (!rtFound) { console.log("Rotten Tomatoes: No Score Found") }

      console.log("Produced in " + body.Country)
      console.log("Presented in " + body.Language)
      console.log("Spoilers: " + body.Plot)
      console.log("Starring: " + body.Actors)
    } else {
      console.log("Could not find movie")
    }
  },
}
