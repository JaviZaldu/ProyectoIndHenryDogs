const axios = require("axios");
const { Dog } = require("../db")
const URL = "https://api.thedogapi.com/v1/breeds";

const getAllDogs = async (req, res) => {
    try {
        const { data: apiDogs } = await axios.get(URL);
        const dbDogs = await Dog.findAll();
        const allDogs = [...dbDogs.map((dbDog) => dbDog.toJSON()), ...apiDogs]
        res.status(200).json({ dogs: allDogs });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las razas de perro" });
    }
};

module.exports = getAllDogs;
