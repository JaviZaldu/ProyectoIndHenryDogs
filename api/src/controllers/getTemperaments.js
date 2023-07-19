const axios = require('axios');
const { Temperaments } = require('../db');

const URL = "https://api.thedogapi.com/v1/breeds";

const getTemperaments = async (req, res) => {
    try {
      // Realiza una solicitud a la API para obtener los temperaments
      const { data } = await axios.get(URL);
      // Guarda los temperaments en la base de datos
      data.forEach((dog) => {
          if(dog.temperament) {
            let temperaments = dog.temperament.split(",").map((temp) => temp.trim()); // para crear un array con los temperaments.
            temperaments.forEach((dogTemp) => {
              Temperaments.findOrCreate({
                where: { 
                  name: dogTemp,
                },
              })
            })
          }
      });

      // Obtiene todos los temperamentos desde la base de datos
      const DBtemperaments = await Temperaments.findAll();
  
      // Envía los temperamentos como respuesta
      res.status(200).json(DBtemperaments);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los temperamentos.' });
    }
  };
  
  module.exports = getTemperaments;



//   const axios = require('axios');
// const { Temperaments } = require('../db');

// const URL = "https://api.thedogapi.com/v1/breeds";

// const getTemperaments = async (req, res) => {
//     try {
//       let DBresponse = await Temperaments.findAll();
//       let DBtemperaments = [];
//       DBresponse.forEach((temperament) => {
//         DBtemperaments.push(temperament.dataValues);
//       });

//       if (DBtemperaments.length === 0) {
//         const { data } = await axios.get(URL);
//         data.forEach((dog) => {
//           if(dog.temperament) {
//             let temperaments = dog.temperament.split(",").map((temp) => temp.trim()); // para crear un array con los temperaments.
//             temperaments.forEach((dogTemp) => {
//               Temperaments.findOrCreate({
//                 where: { 
//                   name: dogTemp,
//                 },
//               })
//             })
//             let DBresponse = await Temperaments.findAll();
//             let DBtemperaments = [];
//             DBresponse.forEach((temperament) => {
//               DBtemperaments.push(temperament.dataValues);
//             });
//             res.status(200).json(DBtemperaments);
//           }
//           else {
//             res.status(200).json(DBresponse)
//           }
//       });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Error al obtener los temperamentos.' });
//     }
//   };
  
//   module.exports = getTemperaments;
