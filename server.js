import { YoutubeTranscript } from 'youtube-transcript';

//const YoutubeTranscript = require('youtube-transcript');

import express from 'express';

//const express = require('express');
const app = express();
const port = 3000;



app.use(express.json()); 
app.use(express.static('homePage'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/homePage/home.html');
});

let summary = {
    "summary": "This is a summary"
}

app.get('/api/summary', (req, res) => {
    // talk to youtube api and get captions

    // send back summary of the video
    //res.send(summary);
    YoutubeTranscript.fetchTranscript('https://www.youtube.com/watch?v=S46iJIk3t70&t=930s').then((transcript) => {
        res.send(transcript);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
