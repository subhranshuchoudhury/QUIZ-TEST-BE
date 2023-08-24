const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
