const axios = require('axios');
const { Temperaments } = require('../db');

const URL = "https://api.thedogapi.com/v1/breeds";

const getTemperaments = async (req, res) => {
    try {
      
      const { data } = await axios.get(URL);
      
      data.forEach((dog) => { // Guarda los temperaments en la DB.
          if(dog.temperament) {
            let temperaments = dog.temperament.split(",").map((temp) => temp.trim()); // Divide en un array y elimina los espacios.

            temperaments.forEach((dogTemp) => { // si no existe, se crea.
              Temperaments.findOrCreate({
                where: { 
                  name: dogTemp,
                },
              })
            })
          }
      });

      const DBtemperaments = await Temperaments.findAll(); // Obtiene todos los temperamentos desde la DB.
  
      res.status(200).json(DBtemperaments); 
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los temperamentos.' });
    }
  };
  
  module.exports = getTemperaments;