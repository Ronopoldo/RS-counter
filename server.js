const express = require('express');
const server = express();

server.all(`/`, (req, res) => {
    res.send(`Please connect me to a hosting website in-order to work 24/7.`);
  console.log(req.protocol + '://' + req.get('host') + req.originalUrl)
});

function keepAlive() {
    server.listen(3000, () => {
        console.log(`24/7 Activation Complete`);

    });
}

module.exports = keepAlive;