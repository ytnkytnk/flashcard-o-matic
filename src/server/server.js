const { PORT = 3000 } = process.env;
const app = require("../appServer");

const listener = () => console.log(`Listening on Port ${PORT}`);

app.listen(PORT, listener);
