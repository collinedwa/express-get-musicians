const express = require("express");
const {check, validationResult} = require("express-validator");
const {Musician} = require("../Musician");

const musicianRoute = express.Router();

musicianRoute.get("/", async (request, response) => {
    results = await Musician.findAll();

    response.json(results);
});

musicianRoute.get("/:id", async (req, res) => {
    result = await Musician.findByPk(req.params.id);
    res.json(result);
});

musicianRoute.post("/",
[check("name").notEmpty().trim().isLength({min: 2, max:20}),
check("instrument").notEmpty().trim()],
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){ 
        res.json({error: errors.array()});
    }else{
        newMusician = await Musician.create({
            name: req.body.name,
            instrument: req.body.instrument
        });

        res.json(newMusician);
    }
});

musicianRoute.put("/:id", async (req, res) => {
    foundMusician = await Musician.findByPk(req.params.id);
    await foundMusician.update(req.body);
    res.json(foundMusician);
});

musicianRoute.delete("/:id", async (req, res) => {
    foundMusician = await Musician.findByPk(req.params.id);
    await foundMusician.destroy();
    res.send("Deleted!");
});

module.exports = musicianRoute;