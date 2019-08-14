# LIRI-NODE-APP
1. Look up concert dates/venues and locations about any band you search for 
2. Look up more information (artist name, album, etc.) about any song you search for 
3. Look up more detailed movie information based on any movie title you search for 

Technologies used:
====================
* Node
* Moment
* DotEnv
* Axios
  * OMDB API  
  * Spotify-API
  * Bands In Town API  




# LIRI uses 4 different commands followed by search keywords entered by the user

## concert-this 
  1. Think of a band or artist whom you'd like concert information about
  2. Type `node liri.js concert-this "artist/band name here"`
  3. View the result in your console or your newly created log.txt file which will record all of your searches for review at any later time
  ![alt text](readme-images\concert-this.gif?raw=true "concert-this examlpe")
## spotify-this-song
  1. Think of a song name you'd like more information about
  2. Type `node liri.js spotify-this-song "song name here"`
  3. View the result in your console or your newly created log.txt file which will record all of your searches for review at any later time
  4. If no song is provided then your program will default to "The Sign" by Ace of Base.
  ![alt text](readme-images\spotify-this-song.gif?raw=true "spotify-this-song examlpe")
## movie-this
  1. Think of a band or artist whom you'd like concert information about
  2. Type `node liri.js movie-this "movie name here"`
  3. View the result in your console or your newly created log.txt file which will record all of your searches for review at any later time
  4. If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
  ![alt text](readme-images\movie-this.gif?raw=true "movie-this examlpe")
## do-what-it-says
  1. Type `node liri.js do-what-it-says`
  2. LIRI will run spotify-this-song for "I Want it That Way" 
  3. View the result in your console or your newly created log.txt file which will record all of your searches for review at any later time
  ![alt text](readme-images\do-what-it-says.gif?raw=true "do-what-it-says examlpe")


[Link to deployed version of the app](https://nfarrell87.github.io/liri-node-app/.)

Created by Nick Farrell, RN with the help of the internet and my teachers <3