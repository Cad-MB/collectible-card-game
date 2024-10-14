const cors = require('cors');
const express = require('express');
const { fetchAndCreateNFTCollection } = require("../../contracts/connectors/Collections")
const { mintNFT } = require("../../contracts/connectors/mintNFT")

function initServer(app) {
    app.use(cors()); // enable CORS for all requests
    app.use(express.json()); // enable parsing JSON bodies

    fetchAndCreateNFTCollection();

    app.get('/', async (req, res) => {
        const response = await mintNFT("base1", '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 'mcd19-3');
        res.send(response);
    }
    );

    require("../routes/routes")(app); // init the routes
}

module.exports = initServer;