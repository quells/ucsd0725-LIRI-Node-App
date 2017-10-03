
const fs = require("fs")

module.exports = {
  WithPluses: function(s) {
      return s.split(" ").join("+")
  },
  ReadFileAsync: function(filename) {
    return new Promise(function(resolve, reject) {
      try {
        fs.readFile(filename, "utf8", function(err, data) {
          if (err) { reject(err) } else { resolve(data) }
        })
      } catch (err) {
        reject(err)
      }
    })
  },
  AppendFileAsync: function(filename, text) {
    return new Promise(function(resolve, reject) {
      try {
        fs.appendFile(filename, text + "\n", function(err) {
          if (err) { reject(err) } else { resolve(text) }
        })
      } catch (err) {
        reject(err)
      }
    })
  },
  Log: function(s) {
    return this.AppendFileAsync("log.txt", s)
      .then(console.log)
      .catch(console.error)
  },
}
