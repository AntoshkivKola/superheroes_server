const { Router } = require('express');
const superheroRouter = require('./superhero');
const superpowerRouter = require('./superpower');
const imageRouter = require('./image');

const router = Router();

router.use('/superheroes', superheroRouter);
router.use('/superpowers',superpowerRouter);
router.use('/superheroes',imageRouter)

module.exports = router;