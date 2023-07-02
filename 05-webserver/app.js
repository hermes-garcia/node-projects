const express = require('express')
const app = express()
const port = 3000;

// middleware - serve static content
app.use( express.static('public') )

app.get( '/generic', (req, res) => {
    res.sendFile( __dirname + '/public/generic.html' );
});

app.get( '/elements', (req, res) => {
    res.sendFile( __dirname + '/public/elements.html' );
});

app.get( '*', (req, res) => {
    res.sendStatus(404);
    res.send( '404 | Page not found' );
});

app.listen(port, () => {
    console.log(`Example app running at port ${port}`);
});