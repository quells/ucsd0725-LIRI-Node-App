
var request = require("request")
var utils = require("./utils.js")

var api_key = "40e9cece"
var url = "https://www.omdbapi.com/?apikey=" + api_key

module.exports = {
    Search: function(title, callback) {
        var q = url + "&t=" + utils.WithPluses(title)
        request(q, (err, res, body) => {
            if (err) { console.error(err) }
            if (res.statusCode !== 200) { console.log(q, res.statusCode) }
            if (body) { callback(JSON.parse(body)) }
        })
    },

    Fallback: function() {
        this.Search("Mr Nobody", this.DisplayMovie)
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

