
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
      utils.Log(body.Title + " (" + body.Year + ")")

      var rtFound = false
      for (var i = 0; i < body.Ratings.length; i++) {
        var rating = body.Ratings[i]
        if (rating.Source === "Rotten Tomatoes") {
          utils.Log("Rotten Tomatoes: " + rating.Value)
          rtFound = true
          break
        }
      }
      if (!rtFound) { utils.Log("Rotten Tomatoes: No Score Found") }

      utils.Log("Produced in " + body.Country)
      utils.Log("Presented in " + body.Language)
      utils.Log("Spoilers: " + body.Plot)
      utils.Log("Starring: " + body.Actors)
    } else {
      utils.Log("Could not find movie")
    }
  },
}
