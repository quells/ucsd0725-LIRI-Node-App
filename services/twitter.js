var strftime = require("strftime")
var utils = require("../utils.js")
var Twitter = require("twitter")
var keys = require("../keys.js")
var TwitterClient = new Twitter(keys.twitter)

module.exports = {
  Statuses: function(user) {
    return TwitterClient.get("statuses/user_timeline", {user_id: user, count: 20})
      .then((tweets, response) => tweets)
  },
  DisplayTweets: function(tweets) {
    tweets.forEach((t) => {
      var dateString = strftime('%F %T', new Date(t.created_at))
      utils.Log("At " + dateString + ", " + t.user.name + " (@" + t.user.screen_name + ") said: `" + t.text + "`")
    })
  }
}
