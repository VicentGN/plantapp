const plantsController = {};

const Plant = require("../models/Plant");
const { Mongoose } = require("mongoose");

plantsController.getPlants = async (req, res) => {
  const plants = await Plant.find();
  res.send(plants);
};

plantsController.getPlant = async (req, res) => {
  const plant = await Plant.findById(req.params._id);
  res.send(plant);
};

plantsController.createPlant = async (req, res) => {
  const { name, sample, habitat, coordinates } = req.body;
  const newPlant = new Plant({
    name,
    sample,
    habitat,
    coordinates,
  });
  newPlant_result = await newPlant.save();
  res.send(newPlant_result);
};

plantsController.updatePlant = async (req, res) => {
  const { name, sample, habitat, coordinates } = req.body;
  const updatedPlant = await Plant.findOneAndUpdate(
    { _id: req.params._id},
    {
      name,
      sample,
      habitat,
      coordinates,
    },
    { new: true }
  );
  res.send(updatedPlant);
};

plantsController.deletePlant = async (req, res) => {
  const deletedPlant = await Plant.findByIdAndDelete(req.params._id)
  res.send(deletedPlant)
};

module.exports = plantsController;
