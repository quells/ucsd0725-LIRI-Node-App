# LIRI Node App

UCSD Coding Bootcamp HW Assignment 08

To install:

0. Have `Node v6` and `npm v5` or newer installed
1. Clone the repo
2. Run `npm install` to download the necessary modules

### Functionality

`node liri.js my-tweets` displays the most recent 20 tweets from the account [20 Lucas Numbers](https://twitter.com/zQLX28gZYmzs9PP).

`node liri.js spotify-this-song "[track title]"` displays information about the requested song and a link to the listing on Spotify. If no track is specified, information about The Sign by Ace of Base is displayed.

`node liri.js movie-this "[movie title]"` displays information about the requested movie from the [Online Movie Database](https://www.omdbapi.com). If no movie is specified, information about Mr. Nobody is displayed.

`node liri.js do-what-it-says` runs several of the previous commands in sequence. The order and content of these commands is read from `random.txt`.
