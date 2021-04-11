const { Router } = require('express');
const SuperpowerController = require('../controller/superpower.controller');
const paginate = require('../middlewares/paginate.mw');

const superpowerRouter = Router();

superpowerRouter.get('/', SuperpowerController.getAllSuperpowers);
superpowerRouter.post('/', SuperpowerController.createSuperpower);

superpowerRouter.get('/:id', SuperpowerController.getSuperpower);
superpowerRouter.patch('/:id', SuperpowerController.updateSuperpower);
superpowerRouter.delete('/:id', SuperpowerController.deleteSuperpower);

module.exports = superpowerRouter;
