require("dotenv").config();
var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");


var input = process.argv[2];
var input2 = process.argv.splice(3).join(" ");
var output;
switch (input) {
    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp")
            .then(function (response) {
                fs.writeFile("concertdata.txt", JSON.stringify(response.data, null, 2), function (err) {

                    // If the code experiences any errors it will log the error to the console.
                    if (err) {
                        return console.log(err);
                    }

                    // Otherwise, it will print: "movies.txt was updated!"
                    console.log("concertdata.txt was updated!");
                    for (i = 0; i < response.data.length; i++)
                    {
                        if (i === 0) {
                            console.log("Venue: " + response.data[i].venue.name, '\n', "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + '\n', + "Date: " + response.data[i].venue.datetime);
                        } else {
                            console.log("Venue: " + response.data[i].venue.name, '\n', "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region, '\n', "Date: " + response.data[i].venue.datetime);
                        }
                    }
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        
        break;
    case "spotify-this-song":
        var spotify = new Spotify(keys.spotify);
        var song = input2;

        spotify
            .search({ type: 'track', query: song })
            .then(function (response) {
                fs.writeFile("spotifydata.txt", JSON.stringify(response, null, 2), function (err) {

                    // If the code experiences any errors it will log the error to the console.
                    if (err) {
                        return console.log(err);
                    }

                    // Otherwise, it will print: "movies.txt was updated!"
                    console.log("spotifydata.txt was updated!");
                    for (var i = 0; i < response.tracks.items[0].artists.length; i++) {
                        if (i === 0) {
                            console.log("Artist(s): " + response.tracks.items[0].artists[i].name);
                        } else {
                            console.log("              " + response.tracks.items[0].artists[i].name);
                        }
                    }
                    console.log("Song: " + response.tracks.items[0].name);
                    console.log("Preview Link: " + response.tracks.items[0].preview_url);
                    console.log("Album: " + response.tracks.items[0].album.name);
                });

            })
            .catch(function (err) {
                console.log(err);
            });
       
        break;
    case "movie-this":
        var movie = input2;
            axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
            .then(function (response) {
                console.log("Title of the movie: " + response.data.Title);
                console.log("Year the movie came out: " + response.data.Year);
                console.log("IMDB Rating of the movie: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating of the movie: " + response.data.Metascore);
                console.log("Country where the movie was produced: " + response.data.Country);
                console.log("Language of the movie: " + response.data.Language);
                console.log("Plot of the movie: " + response.data.Plot);
                console.log("Actors in the movie: " + response.data.Actors);
             });
        break;
    case "do-what-it-says":
        output = "do what it says";
        break;
    default:
        output = "Not a recognized command";
        break;
}
