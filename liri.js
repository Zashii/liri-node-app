require("dotenv").config();

var key = require('./keys.js');
var Spotify = require('node-spotify-api');
var fs = require('file-system');


var spotify = new Spotify(key.spotify);
// var client = new Twitter(key.twitter);

var lirify = function(args) {

    fs.appendFile("log.txt", ", " + args[0] + ", " + args[1], function(err){
        if (err) {
            return console.log(err);
        }

    });

    //Using the Spotify API
    if (args[0] == "spotify-this-song"){ 
        if (args[1] != undefined) {
            spotify.search({ type: 'track', query: args[1] }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
                }
            console.log("*********************** Spotify *********************");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name); 
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log("Album Name: " + data.tracks.items[0].album.name); 
            console.log("*********************** Spotify *********************");
            });;
        } else {
            spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
                }
            console.log("*********************** Spotify *********************");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name); 
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log("Album Name: " + data.tracks.items[0].album.name); 
            console.log("*********************** Spotify *********************");
            });;
        }
    };


    var request = require("request");

    //Using the OMDB api
    if (args[0] == "movie-this"){
        if (args[1] != undefined) {    
            request("http://www.omdbapi.com/?apikey=trilogy&t=" + args[1], function(error, response, body){
                if (!error && response.statusCode === 200){1
                    console.log("*********************** OMDB *********************");
                    console.log("Movie Title: " + JSON.parse(body).Title);
                    console.log("Year of Release: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1]);
                    console.log("Country of Release: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("*********************** OMDB *********************");
                }
            });
        } else {
            request("http://www.omdbapi.com/?apikey=trilogy&t=Mr.Nobody", function(error, response, body){
                if (!error && response.statusCode === 200){
                    console.log("*********************** OMDB *********************");
                    console.log("Movie Title: " + JSON.parse(body).Title);
                    console.log("Year of Release: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1]);
                    console.log("Country of Release: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("*********************** OMDB *********************");
                }
            });
        }

    };
};


//Running a command from random.txt
if (process.argv[2] == "do-what-it-says") {

     fs.readFile("random.txt", "utf8", function(err,data){
        
        if (err) {
            throw err;
        } 

        readDat = data.split(","); 

        lirify(readDat);
     });
} else {
    var argDat = process.argv;
    argDat.shift();
    argDat.shift();
    lirify(argDat);
}