const { Router } = require('express');
const router = Router();

const { getPlants, getPlant, createPlant, updatePlant, deletePlant } = require('../controllers/plantsController');

router.route('/')
  .get(getPlants)
  .post(createPlant);

router.route('/:_id')
  .get(getPlant) 
  .put(updatePlant)
  .delete(deletePlant);

module.exports = router;