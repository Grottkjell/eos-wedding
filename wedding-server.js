const express = require('./node_modules/express');

const resources = ['/index.html', '/main.css', 'wedding.js', 'images', 'node_modules'];

const app = express();

resources.forEach(resource => {
    const path = __dirname + resource;
    app.use(express.static(path));
    console.log(`Serving static content ${path}`);
});