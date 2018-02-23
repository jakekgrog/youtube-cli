const youtube = require('youtube-search');
const opn = require('opn');

//Define search function
const search = function search(query) {
    console.info("You've searched for: " + query + "\n");
    var opts = {
        maxResults: 10,
        key: 'AIzaSyBKn6paSgoe2XkSOUdtaLtD9XN_XRKVYXU'
    }

    youtube(query, opts, function(err, results){
        if (err) throw err;

        //Dicts for mapping video(v) and channel(c) id to url
        var cdict = {};
        var vdict = {};

        //Display the channels
        console.info("Channels:\n========= ")
        for(var i = 0; i < results.length; i++){
            if(results[i].kind == 'youtube#channel'){
                console.info(results[i].title);
            }
        }

        //Display the videos and ids
        console.info("\nVideos:\n=======\nID: Title:\n--- ----------------------------------------------");
        for(var i = 0; i < results.length; i++){
            if(results[i].kind == 'youtube#video'){
                console.info(i + "   " + results[i].title);
                vdict[i] = results[i].link;
            }
        }

        console.info("\nWhat video do you want to watch?: ");
        
        //open standard input stream
        var vidID;
        var stdin = process.openStdin();

        //get input and check vdict for the id, if exists then open url in browser
        stdin.addListener("data", function(value){    
            console.info("Now watching video ["+value.toString().trim()+"]");
            vidID = parseInt(value);
            opn(vdict[vidID]);
            stdin.end();
        });
    });

}

//Export the search function
module.exports = ( search );