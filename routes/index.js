const { Router } = require('express');
const superheroRouter = require('./superhero');


const router = Router();

router.use('/super', superheroRouter);


module.exports = router;