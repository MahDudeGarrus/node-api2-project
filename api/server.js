// implement your server here
const express = require('express');
const server = express();
const postRouter = require("./posts/posts-router.js")

server.use(express.json());
server.use('/api/posts', postRouter)
// require your posts router and connect it here

server.get('/', (req, res) => {
    res.send(`
        <h1>Lambda Posts API</h1>
        <p>Welcome to the Lambda Posts Api</p>
    `)
})

module.exports = server;