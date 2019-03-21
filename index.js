const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, resp){
    resp.sendFile(path.join(__dirname, 'build','index.html'))
});

app.listen(4000)