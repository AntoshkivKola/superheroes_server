const { Router } = require('express');
const SuperheroController = require('../controller/superhero.controller');
const paginate = require('../middlewares/paginate.mw');

const superheroRouter = Router();

superheroRouter.get('/', paginate, SuperheroController.getAllSuperheroes);
superheroRouter.post('/', SuperheroController.createSuperhero);

superheroRouter.get('/:id', SuperheroController.getSuperhero);
superheroRouter.patch('/:id', SuperheroController.updateSuperhero);
 superheroRouter.delete('/:id', SuperheroController.deleteSuperhero);


module.exports = superheroRouter;
