import { YoutubeTranscript } from 'youtube-transcript';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(express.static('homePage'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/homePage/home.html');
});

app.get('/api/summary/:id', (req, res) => {
    // talk to youtube api and get captions
    // send back summary of the video
    const base_url = 'https://www.youtube.com/watch?v=';
    const video_id = req.params.id;
    const video_url = base_url + video_id;

    YoutubeTranscript.fetchTranscript(video_url).then((transcript) => {
        res.send(transcript);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});