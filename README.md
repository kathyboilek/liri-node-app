# liri-node-app

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives user back data.

    LIRI will display latest tweets.
    To retrieve the data that will power this app, need to send requests to the Twitter, Spotify and OMDB APIs.
        * [Twitter](https://www.npmjs.com/package/twitter)
        
        * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
        
        * [Request](https://www.npmjs.com/package/request)
            * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

        * [DotEnv](https://www.npmjs.com/package/dotenv)

    Get your Twitter API keys by following these steps:
        * Step One: Visit <https://apps.twitter.com/app/new>
        
        * Step Two: Fill out the form with dummy data. Type `http://google.com` in the Website input. Don't fill out the Callback URL input. Then submit the form.
        
        * Step Three: On the next screen, click the Keys and Access Tokens tab to get your consume key and secret. 
            
        * Step Four: At the bottom of the page, click the `Create my access token` button to get your access token key and secret. 

       * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).


    Each Command Should Do

        1. `node liri.js my-tweets`
            * This will show your last 20 tweets and when they were created at in your terminal/bash window.

        2. `node liri.js spotify-this-song '<song name here>'`
            * This will show the following information about the song in your terminal/bash window
        
                * Artist(s)
                
                * The song's name
                
                * A preview link of the song from Spotify
                
                * The album that the song is from

            * If no song is provided then program will default to "The Sign" by Ace of Base.
            
            * Utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
            
