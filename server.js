const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('homePage'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/homePage/home.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});