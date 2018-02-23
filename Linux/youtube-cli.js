#!/usr/bin/env node

//Import commander.js
const program = require('commander');

//Import the search function
const search = require('./search');

//Initialise the program
program
    .version("1.0.0")
    .description("Youtube Command-Line Tool");

// Process the search query by passing to ./search
program
    .command('search <query>')
    .alias('-s')
    .description("Search videos")
    .action(query => 
        search(query) //Call the search command and pass query
    );

program.parse(process.argv);