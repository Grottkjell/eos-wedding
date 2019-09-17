const express = require('express');
const path = require('path');

const app = express();

const dir = path.join(__dirname, '/static');

app.use(
    '/',
    express.static(
        dir/* ,
        {
            index: '/static/index.html'
        } */));

console.log(`Serving path ${dir}`);

const port = 80;
app.listen(port, () => {
    console.log(`Starting application on port ${port}`);
});