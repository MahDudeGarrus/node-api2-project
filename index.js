// require your server and launch it here
const port = 5000;
const server = require("./api/server.js")

server.listen(port, () => {
    console.log("Running on port 5000")
})