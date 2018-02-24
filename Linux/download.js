const youtube = require('youtube-search');
const opn = require('opn');
const dl = require('youtube-dl');
const fs = require('fs');

const keys = require('./keys/keys');

//Define search function
const download = function download(query) {
    console.info("You've searched for: " + query + "\n");
    var opts = {
        maxResults: 25,
        key: keys.YT_API_KEY
    }

    youtube(query, opts, function(err, results){
        if (err) throw err;

        //Dicts for mapping video(v) and channel(c) id to url
        var vdict = {};
        var id_to_name = {};

        //Display the videos and ids
        console.info("\nVideos:\n=======\nID: Title:\n--- ----------------------------------------------");
        for(var i = 0; i < results.length; i++){
            if(results[i].kind == 'youtube#video'){
                console.info(i + "   " + results[i].title);
                vdict[i] = results[i].link;
                id_to_name[i] = results[i].title;
            }
        }

        console.info("\nWhat video do you want to download?: ");
        
        //open standard input stream
        var vidID;
        var stdin = process.openStdin();

        //get input and check vdict for the id, if exists then open url in browser
        stdin.addListener("data", function(value){    
            console.info("Downloading video: ["+value.toString().trim()+"]");
            vidID = parseInt(value);

            var video = dl(vdict[vidID],
                // Optional arguments passed to youtube-dl.
                ['--format=18'],
                // Additional options can be given for calling `child_process.execFile()`.
                { cwd: __dirname });
            
            var fn;
            video.on('info', function(info, fn) {
                console.log('Download started');
                console.log('filename: ' + info._filename);
                fn = info._filename;
                console.log('size: ' + info.size);
                console.info('Downloading...');
              });

            
            
            video.pipe(fs.createWriteStream(id_to_name[vidID] + ".mp4"));
            stdin.end();
        });
    });

}

//Export the search function
module.exports = ( download );