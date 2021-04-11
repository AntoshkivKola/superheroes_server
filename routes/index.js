const { Router } = require('express');
const superheroRouter = require('./superhero');


const router = Router();

router.use('/superheroes', superheroRouter);


module.exports = router;