#!/usr/bin/env node

//Import commander.js
const program = require('commander');

//Import functions
const search = require('./search');
const download = require('./download');

//Initialise the program
program
    .version("1.0.0")
    .description("YouTube Command-Line Tool");

// Process the search query by passing to ./search
program
    .command('search <query>')
    .alias('s')
    .description("Search videos")
    .action(query => 
        search(query) //Call the search command and pass query
    );

program
    .command('download <query>')
    .alias('d')
    .description("Download videos")
    .action(query => 
        download(query)
    );

program.parse(process.argv);