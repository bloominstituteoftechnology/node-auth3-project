const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Lambda School Authentication II Project');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

//Run app, then load http://localhost:3000 in a browser to see the output.