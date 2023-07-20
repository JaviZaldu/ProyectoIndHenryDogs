const { Dog, Temperaments } = require('../db');

const createDog = async (req, res) => {
    try {
        const {name, heightMin, heightMax, weight, image, ageMin, ageMax, temperament } = req.body;

        if (!name || !heightMin || !heightMax || !weight || !image || !ageMin || !ageMax || !temperament) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const existingDog = await Dog.findOne({ // Verifica si existe en DB.
        where: {
            name: name,
        },
        });

        if (existingDog) { // Error.
        return res.status(400).json({ error: "Ya existe un perro con el mismo nombre" });
        }

        const newDog = await Dog.create({ // Crea.
            name, 
            image, 
            heightMin,
            heightMax,
            weight,
            ageMin,
            ageMax,
            temperament
        })

        const temperamentArray = Array.isArray(temperament) ? temperament : [temperament]; // Convierte a un array si no es.
        const existingTemperaments = await Temperaments.findAll();                         // Obtiene los temps de la DB.
        const existingTemperamentNames = temperamentArray.filter((temp) =>                 // Filtra los temps de la DB.
        existingTemperaments.some((existingTemp) => existingTemp.name === temp)
        );
        for (const temperamentName of existingTemperamentNames) {                          // Asocia los temps al nuevo perro.
        const existingTemperament = existingTemperaments.find((temp) => temp.name === temperamentName);
        await newDog.addTemperaments(existingTemperament);
        }
        res.status(201).json({ data: newDog });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el perro. Detalles: " + error.message });
    }
};

module.exports = createDog;