var dotenv = require('dotenv').config;


// Add the code required to import the `keys.js` file
var SpotifyWebApi = require('spotify-web-api-node');
// var TweetWebApi = require('twitter');
var keys = require('./keys.js');
var spotifyApi = new SpotifyWebApi(keys.spotify);
// var client = new TweetWebApi(keys.twitter);



//and store it in a variable.
var nodeArgv = process.argv;
var command = process.argv[2];

var x = "";
//attaches multiple word arguments
for (var i=3; i < nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}

fs.catch((error) => {
  assert.isNotOk(error,'Promise error');
});


// Grab the fs package to handle read/write.
var fs = require("fs");

// Make it so liri.js can take in the following commands:
switch(command){
    // case "my-tweets":
    //   getMyTweets();
    // break;
  
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
  
    // function getMyTweets() {
    //   $ twurl "/1.1/statuses/user_timeline.json";
    
    //   // Search parameters includes my tweets up to last 20 tweets;
    //   var params = {q: '@brwneyes', count: 20};
    
    //   // Shows up to last 20 tweets and when created in terminal.
    //   client.get('search/tweets', params, function(error, tweets, response) {
    //     if (!error) {
    
    //       // Loops through tweets and prints out tweet text and creation date.
    //       for (var i = 0; i < tweets.statuses.length; i++) {
    //         var tweetText = tweets.statuses[i].text;
    //         console.log("Tweet Text: " + tweetText);
    //         var tweetCreationDate = tweets.statuses[i].created_at;
    //         console.log("Tweet Creation Date: " + tweetCreationDate);
    //       }
    //     } else {
    //       console.log(error);
    //     }
    //   });

  //   client.get('statuses/user_timeline', { screen_name: 'brwneyes', count: 20 }, function(error, tweets, response) {
  //     if (!error && response.statusCode == 200) {
  //       ('index', { tweets: tweets });
  //       console.log("@brwneyes5: " + tweets.text);
  //     }else{
  //       console.log('Error occurred');
  // }
  //   });
  // }

  function spotifySong(song){
    spotifyApi.searchTracks({ type: 'track', query: song}, function(error, data){
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





