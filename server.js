const express = require("express");
const musicianRoute = require("./routes/musicianRoute")
const app = express();
const {Musician} = require("./Musician");
const {sequelize} = require("./db");

const port = 3000;

app.use(express.json());
app.use("/musicians", musicianRoute)

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`);
});