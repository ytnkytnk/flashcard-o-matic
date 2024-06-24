// for app

const { PORT = 3000 } = process.env;
const app = require("../appServer");

const listener = () => console.log(`Listening on Port ${PORT}`);

app.listen(PORT, listener);

// for json-server

const express = require("express");
const json = express();
const jsonPort = 5000;

json.use(express.static("/utils/api/index.js"));

json.listen(jsonPort, () => console.log(`Listening on Port ${jsonPort}`));
