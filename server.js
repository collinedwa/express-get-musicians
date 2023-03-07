const express = require("express");
const app = express();
const {Musician} = require("./Musician");
const {sequelize} = require("./db");

const port = 3000;

app.use(express.json());

//TODO

app.get("/musicians", async (request, response) => {
    results = await Musician.findAll();

    response.json(results);
});

app.get("/musicians/:id", async (req, res) => {
    result = await Musician.findByPk(req.params.id);
    res.json(result);
});

app.post("/musicians", async (req, res) => {
    newMusician = await Musician.create({
        name: req.body.name,
        instrument: req.body.instrument
    });

    res.json(newMusician);
});

app.put("/musicians/:id", async (req, res) => {
    foundMusician = await Musician.findByPk(req.params.id);
    await foundMusician.update(req.body);
    res.json(foundMusician);
});

app.delete("/musicians/:id", async (req, res) => {
    foundMusician = await Musician.findByPk(req.params.id);
    await foundMusician.destroy();
    res.send("Deleted!");
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`);
});