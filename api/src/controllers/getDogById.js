const axios = require("axios");
const { Dog } = require('../db');
const URL = "https://api.thedogapi.com/v1/breeds";
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const apiKey = process.env.API_KEY;

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (uuidRegex.test(id)) {
      const dbDog = await Dog.findByPk(id);

      if (dbDog) {
        res.status(200).json({ data: dbDog });
      } else {
        const { data } = await axios.get(URL + "?api_key=" + apiKey);
        const apiDog = data.find(dog => dog.id === parseInt(id));

        if (apiDog) {
          const { data: imageData } = await axios.get(
            "https://api.thedogapi.com/v1/images/" + apiDog.reference_image_id
          );

          apiDog.image = imageData.url; // Agrega la imagen al objeto apiDog

          res.status(200).json({ data: apiDog });
        } else {
          res.status(404).send({ error: "No se encontró ningún perro" });
        }
      }
    } else {
      const { data } = await axios.get(URL);
      const apiDog = data.find(dog => dog.id === parseInt(id));

      if (apiDog) {
        const { data: imageData } = await axios.get(
          "https://api.thedogapi.com/v1/images/" + apiDog.reference_image_id
        );

        apiDog.image = imageData.url; // Agrega la imagen al objeto apiDog

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
