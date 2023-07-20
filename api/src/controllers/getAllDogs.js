const axios = require("axios");
const { Dog } = require("../db")
const URL = "https://api.thedogapi.com/v1/breeds";

const getAllDogs = async (req, res) => {
    try {
        const { data: apiDogs } = await axios.get(URL); // Obtiene la lista de razas de la api.
        const dbDogs = await Dog.findAll(); // Obtiene las razas de la DB.
        const allDogs = [...dbDogs.map((dbDog) => dbDog.toJSON()), ...apiDogs] // Combina las razas de la api con las de la DB. Modificando el formato.
        res.status(200).json({ dogs: allDogs });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las razas de perro" });
    }
};

module.exports = getAllDogs;
