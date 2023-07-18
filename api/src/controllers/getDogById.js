const axios = require("axios");

const { Dog } = require('../db');

const URL = "https://api.thedogapi.com/v1/breeds";

// Expresión regular para validar UUID
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (uuidRegex.test(id)) {
      // Si el ID es un UUID válido, buscar en la base de datos.
      const dbDog = await Dog.findByPk(id);

      if (dbDog) {
        // Si encuentra un perro con ese ID en la BD, devuelve el perro correspondiente.
        res.status(200).json({ data: dbDog });
      } else {
        // Si no encuentra el perro en la base de datos, busca en la API.
        const { data } = await axios.get(URL);
        const apiDog = data.find(dog => dog.id === parseInt(id));

        if (apiDog) {
          // Si el ID está en el rango, devuelve la respuesta de la API.
          res.status(200).json({ data: apiDog });
        } else {
          // Si no encuentra ningún perro con ese ID en la API, devuelve un error.
          res.status(404).send({ error: "No se encontró ningún perro" });
        }
      }
    } else {
      // Si el ID no es un UUID válido, busca en la API.
      const { data } = await axios.get(URL);
      const apiDog = data.find(dog => dog.id === parseInt(id));

      if (apiDog) {
        // Si el ID está en el rango, devuelve la respuesta de la API.
        res.status(200).json({ data: apiDog });
      } else {
        // Si no encuentra ningún perro con ese ID en la API, devuelve un error.
        res.status(404).send({ error: "No se encontró ningún perro" });
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getDogById;