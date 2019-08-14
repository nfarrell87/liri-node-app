require("dotenv").config();
var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');


var input = process.argv[2];
var input2 = process.argv.splice(3).join(" ");

switch (input) {
    case "concert-this":
        var artist = input2
        var search = '\n\n' + "Keyword(s) used for search: " + artist + '\n';
        if (artist === "") {
            console.log("Please type in a band you'd like to find concert dates for");
        } else {
            fs.appendFile("log.txt", search, function (err) {

                // If the code experiences any errors it will log the error to the console.
                if (err) {
                    return console.log(err);
                }
            });
            axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
                .then(function (response) {
                    for (i = 0; i < response.data.length; i++) {
                        var venue = "Venue: " + response.data[i].venue.name + '\n';
                        var location = "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + '\n';
                        var date = moment(response.data[i].venue.datetime).format("MM/DD/YYYY");
                        var dateDisplay = "Date: " + date + '\n';

                        var concertInfo = venue + location + dateDisplay + '\n';
                        console.log(concertInfo);
                        fs.appendFile("log.txt", concertInfo, function (err) {

                            // If the code experiences any errors it will log the error to the console.
                            if (err) {
                                return console.log(err);
                            }
                        });

                    }
                    console.log("search history was updated!");
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
        break;
    case "spotify-this-song":
        var spotify = new Spotify(keys.spotify);
        var song = input2;
        if (song === "") {
            song = "Never gonna give you up"
        };
        spotify
            .search({ type: 'track', query: song })
            .then(function (response) {
                for (var i = 0; i < response.tracks.items[0].artists.length; i++) {
                    if (i === 0) {
                        console.log("Artist(s): " + response.tracks.items[0].artists[i].name);
                        var artist = "Artist(s): " + response.tracks.items[0].artists[i].name + '\n';

                    } else {
                        console.log(" " + response.tracks.items[0].artists[i].name);
                    }
                }
                console.log("Song: " + response.tracks.items[0].name);
                console.log("Album: " + response.tracks.items[0].album.name);
                var preview = response.tracks.items[0].preview_url;
                if (preview === null) {
                    console.log("Preview Link: Unavailable for this song :(");
                    var previewText = "Preview Link: Unavailable on Spotify for this song :(" + '\n';
                } else {
                    console.log("Preview Link: " + preview);
                    var previewText = "Preview Link: " + preview + '\n';
                }
                var search = '\n' + "Keyword(s) used for search: " + song + '\n';
                var songName = "Song: " + response.tracks.items[0].name + '\n';
                var album = "Album: " + response.tracks.items[0].album.name + '\n';


                fs.appendFile("log.txt", search + artist + songName + album + previewText, function (err) {

                    // If the code experiences any errors it will log the error to the console.
                    if (err) {
                        return console.log(err);
                    }
                    // Otherwise, it will print: "movies.txt was updated!"
                    console.log("search history was updated!");
                });
            })
            .catch(function (err) {
                console.log(err);
            });

        break;
    case "movie-this":
        var movie = input2;
        if (movie === "") {
            movie = "Mr.Nobody"
        };
        var search = '\n' + "Keyword(s) used for search: " + movie + '\n';
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
                var title = "Title of the movie: " + response.data.Title + '\n';
                var year = "Year the movie came out: " + response.data.Year + '\n';
                var imdb = "IMDB Rating of the movie: " + response.data.imdbRating + '\n';
                var meta = "Rotten Tomatoes Rating of the movie: " + response.data.Metascore + '\n';
                var country = "Country where the movie was produced: " + response.data.Country + '\n';
                var language = "Language of the movie: " + response.data.Language + '\n';
                var plot = "Plot of the movie: " + response.data.Plot + '\n';
                var actors = "Actors in the movie: " + response.data.Actors + '\n';
                fs.appendFile("log.txt", search + title + year + imdb + meta + country + language + plot + actors, function (err) {

                    // If the code experiences any errors it will log the error to the console.
                    if (err) {
                        return console.log(err);
                    }
                    // Otherwise, it will print: "movies.txt was updated!"
                    console.log("search history was updated!");
                });
            })
            .catch(function (err) {
                console.log(err);
            });
        break;
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }
            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
            if (dataArr[0] === "spotify-this-song") {
                var spotify = new Spotify(keys.spotify);
                var song = dataArr[1];
                if (song === "") {
                    song = "Never gonna give you up"
                };
                spotify
                    .search({ type: 'track', query: song })
                    .then(function (response) {
                        for (var i = 0; i < response.tracks.items[0].artists.length; i++) {
                            if (i === 0) {
                                console.log("Artist(s): " + response.tracks.items[0].artists[i].name);
                                var artist = "Artist(s): " + response.tracks.items[0].artists[i].name + '\n';

                            } else {
                                console.log(" " + response.tracks.items[0].artists[i].name);
                            }
                        }
                        console.log("Song: " + response.tracks.items[0].name);
                        console.log("Album: " + response.tracks.items[0].album.name);
                        var preview = response.tracks.items[0].preview_url;
                        if (preview === null) {
                            console.log("Preview Link: Unavailable for this song :(");
                            var previewText = "Preview Link: Unavailable on Spotify for this song :(" + '\n';
                        } else {
                            console.log("Preview Link: " + preview);
                            var previewText = "Preview Link: " + preview + '\n';
                        }
                        var search = '\n' + "Keyword(s) used for search: " + song + '\n';
                        var songName = "Song: " + response.tracks.items[0].name + '\n';
                        var album = "Album: " + response.tracks.items[0].album.name + '\n';


                        fs.appendFile("log.txt", search + artist + songName + album + previewText, function (err) {

                            // If the code experiences any errors it will log the error to the console.
                            if (err) {
                                return console.log(err);
                            }
                            // Otherwise, it will print: "movies.txt was updated!"
                            console.log("search history was updated!");
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        });
        break;
    default:
        console.log("Not a recognized command! Please try again");
        break;
}
