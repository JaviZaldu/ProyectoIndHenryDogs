const axios = require("axios");

const { Dog }= require('../db');

const { Op } = require("sequelize");

const URL = "https://api.thedogapi.com/v1/breeds";

const getDogsByName = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {  // busca el nombre en la api.
      const { data: apiData } = await axios.get(URL);

      const apiDogs = apiData.filter((dog) => // Filtra las razas con el nombre.
      dog.name.toLowerCase().includes(name.toLowerCase())).map((dog) =>
      ({
          name: dog.name,
          image: dog.image?.url,
          height: dog.height?.metric,
          weight: dog.weight?.metric,
          life_span: dog.life_span,
      }));

      const dbDogs = await Dog.findAll({ // Busca el nombre en la DB.
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      });

      if (apiDogs.length === 0 && dbDogs.length === 0) {
        return res.status(404).json({ message: 'No se encontraron razas de perros.' });
      }

      return res.status(200).json([...dbDogs, ...apiDogs]);
    } else {
      return res.status(400).json({ message: 'Debes proporcionar un nombre de raza de perro.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = getDogsByName;