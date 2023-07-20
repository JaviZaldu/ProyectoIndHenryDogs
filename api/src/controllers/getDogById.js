const axios = require("axios");

const { Dog } = require('../db');

const URL = "https://api.thedogapi.com/v1/breeds";
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (uuidRegex.test(id)) {                    // Si el ID es un UUID, busca en la DB.
      const dbDog = await Dog.findByPk(id);

      if (dbDog) {                               // Si encuentra, lo devuelve.
        res.status(200).json({ data: dbDog });
      } else {                                   // Si no, busca en la api.
        const { data } = await axios.get(URL);
        const apiDog = data.find(dog => dog.id === parseInt(id));

        if (apiDog) {                            // Si esta en la api, lo devuelve.
          res.status(200).json({ data: apiDog });
        } else {                                
          res.status(404).send({ error: "No se encontró ningún perro" });
        }
      }
    } else {                                    // Si el ID no es un UUID, busca en la api.
      const { data } = await axios.get(URL);
      const apiDog = data.find(dog => dog.id === parseInt(id));

      if (apiDog) {                             // Si encuentra, lo devuelve.
        res.status(200).json({ data: apiDog });
      } else {
        res.status(404).send({ error: "No se encontró ningún perro" });
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getDogById;