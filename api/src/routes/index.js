const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllDogs = require("../controllers/getAllDogs");
const getDogById = require("../controllers/getDogById");
const getDogsByName = require("../controllers/getDogsByName");
const createDog = require("../controllers/createDog");
const getTemperaments = require('../controllers/getTemperaments');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/temperaments', getTemperaments);
router.get('/name', getDogsByName);
router.get('/:id', getDogById);
router.get('/', getAllDogs);
router.post('/', createDog);



module.exports = router;
