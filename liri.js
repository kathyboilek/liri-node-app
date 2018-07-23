var dotenv = require('dotenv').config;


// Add the code required to import the `keys.js` file
var keys = require('./keys.js');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//and store it in a variable.
var nodeArgv = process.argv;
var command = process.argv[2];

// Grab the fs package to handle read/write.
var fs = require("fs");

// Make it so liri.js can take in the following commands:
switch(command){
    case "my-tweets":
      showTweets();
    break;
  
    case "spotify-this-song":
      if(x){
        spotifySong(x);
      } else{
        // If no song is provided then default to "The Sign" by Ace of Base, UGH!! 
        spotifySong("The Sign");
      }
    break;
  
    case "movie-this":
      if(x){
        omdbData(x)
      } else{
        omdbData("Mr. Nobody")
      }
    break;
  
    case "do-what-it-says":
      doThing();
    break;
  
    default:
      console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
    break;
  }
  
  function showTweets(){
    // This will show your last 20 tweets and when they were created at in your terminal/bash window.
    var screenName = {screen_name: 'brwneyes'};
    client.get('statuses/user_timeline', screenName, function(error, tweets, response){
      if(!error){
        for(var i = 0; i<tweets.length; i++){
          var date = tweets[i].created_at;
          console.log("@brwneyes: " + tweets[i].text + " Created At: " + date.substring(0, 19));
          console.log("-----------------------");
          
          //adds text to log.txt file
          fs.appendFile('log.txt', "@brwneyes: " + tweets[i].text + " Created At: " + date.substring(0, 19));
          fs.appendFile('log.txt', "-----------------------");
        }
      }else{
        console.log('Error occurred');
      }
    });
  }

  function spotifySong(song){
    spotify.search({ type: 'track', query: song}, function(error, data){
      if(!error){
        for(var i = 0; i < data.tracks.items.length; i++){
          var songData = data.tracks.items[i];
          //artist
          console.log("Artist: " + songData.artists[0].name);
          //song name
          console.log("Song: " + songData.name);
          //spotify preview link
          console.log("Preview URL: " + songData.preview_url);
          //album name
          console.log("Album: " + songData.album.name);
          console.log("-----------------------");
          
          //adds text to log.txt
          fs.appendFile('log.txt', songData.artists[0].name);
          fs.appendFile('log.txt', songData.name);
          fs.appendFile('log.txt', songData.preview_url);
          fs.appendFile('log.txt', songData.album.name);
          fs.appendFile('log.txt', "-----------------------");
        }
      } else{
        console.log('Error occurred.');
      }
    });
  }
  
// Then run a request to the OMDB API with the movie 
// This will output the following information to your terminal/bash window
function omdbData(movie){
    // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
    var request = require("request");

    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true&apikey=trilogy';
  
    request(omdbURL, function (error, response, body){
        // If the request is successful (i.e. if the response status code is 200)
        if(!error && response.statusCode == 200){
            var body = JSON.parse(body);
  
        console.log("Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMdB Rating: " + body.imdbRating);
        console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
  
        // In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
        // Make sure you append each command you run to the `log.txt` file. 
        // Do not overwrite your file each time you run a command.
        fs.appendFile('log.txt', "Title: " + body.Title);
        fs.appendFile('log.txt', "Release Year: " + body.Year);
        fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
        fs.appendFile('log.txt', "Country: " + body.Country);
        fs.appendFile('log.txt', "Language: " + body.Language);
        fs.appendFile('log.txt', "Plot: " + body.Plot);
        fs.appendFile('log.txt', "Actors: " + body.Actors);
        fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
        fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
  
      } else{
        console.log('Error occurred.')
      }
  
  if(movie === "Mr. Nobody"){
    console.log("-----------------------");
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");

    //adds text to log.txt
    fs.appendFile('log.txt', "-----------------------");
    fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    fs.appendFile('log.txt', "It's on Netflix!");
}
});

}
// store the text file random given to us from the command line.
var random = process.argv[2];

// Append the contents "I Want it That Way" into the file.
// If the file didn't exist, then it gets created on the fly.
function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){        
          var txt = data.split(',');
          spotifySong(txt[1]);
    });
}

