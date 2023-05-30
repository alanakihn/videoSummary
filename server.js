import { YoutubeTranscript } from 'youtube-transcript';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const document = dom.window.document;

app.use(express.json()); 
app.use(express.static('homePage'));

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
    
    const form = document.getElementById("video-link-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const videoURL = document.getElementById("videoURL").value;
        fetchTranscript(videoURL);
    });

    function fetchTranscript(videoURL) {
        YoutubeTranscript.fetchTranscript(videoURL).then((transcript) => {
            const transcriptElement = document.getElementById("transcript");
            transcriptElement.innerHTML = transcript;
        });
    }
});