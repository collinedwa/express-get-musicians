const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO

app.get("/musicians", async (request, response) => {
    results = await Musician.findAll();

    response.json(results);
})

app.get("/musicians/:id", async (req, res) => {
    result = await Musician.findByPk(req.params.id);
    res.json(result);
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})