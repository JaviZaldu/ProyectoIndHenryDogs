const { Dog, Temperaments } = require('../db');

const createDog = async (req, res) => {
    try {
        const {name, heightMin, heightMax, weightMin, weightMax, image, ageMin, ageMax, temperament } = req.body;

        if (!name || !heightMin || !heightMax || !weightMin || !weightMax || !image || !ageMin || !ageMax || !temperament) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        // Verificar si ya existe un perro con el mismo nombre en la base de datos
        const existingDog = await Dog.findOne({
        where: {
            name: name,
        },
        });

        if (existingDog) {
        return res.status(400).json({ error: "Ya existe un perro con el mismo nombre" });
        }

        const newDog = await Dog.create({
            name, 
            image, 
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            ageMin,
            ageMax,
            temperament
        })

        for (const temperamentName of temperament) { 
            let temperament = await Temperaments.findOne({
            where: {
                name: temperamentName,
            }
        });
        if (!temperament) {
            temperament = await Temperaments.create({
                name: temperamentName,
            })
            await newDog.addTemperaments(temperament)
        }
    }
    res.status(201).json({ data: newDog });
    
    } catch (error) {
        res.status(500).json({ error: "Error al crear el perro. Detalles: " + error.message });
    }
};

module.exports = createDog;