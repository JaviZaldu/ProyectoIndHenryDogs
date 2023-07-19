const { Dog, Temperaments } = require('../db');

const createDog = async (req, res) => {
    try {
        const {name, heightMin, heightMax, weight, image, ageMin, ageMax, temperament } = req.body;

        if (!name || !heightMin || !heightMax || !weight || !image || !ageMin || !ageMax || !temperament) {
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
            weight,
            ageMin,
            ageMax,
            temperament
        })

        // Convertir temperament a un array si no lo es
    const temperamentArray = Array.isArray(temperament) ? temperament : [temperament];

    // Obtener los temperamentos existentes en la base de datos
    const existingTemperaments = await Temperaments.findAll();

    // Filtrar los temperamentos proporcionados que ya existen en la base de datos
    const existingTemperamentNames = temperamentArray.filter((temp) =>
      existingTemperaments.some((existingTemp) => existingTemp.name === temp)
    );

    // Asociar los temperamentos existentes al nuevo perro
    for (const temperamentName of existingTemperamentNames) {
      const existingTemperament = existingTemperaments.find((temp) => temp.name === temperamentName);
      await newDog.addTemperaments(existingTemperament);
    }

    res.status(201).json({ data: newDog });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el perro. Detalles: " + error.message });
    }
};

module.exports = createDog;