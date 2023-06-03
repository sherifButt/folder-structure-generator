const Feature = require('../db/models/feature');

/**
 * Retrieves all features from the database
 * @returns {Promise<Feature[]>} - Promise that resolves to an array of Feature objects
 */
const getFeatures = async () => {
  try {
    const features = await Feature.findAll();
    return features;
  } catch (err) {
    throw new Error(`Error retrieving features: ${err.message}`);
  }
};

/**
 * Creates a new feature in the database
 * @param {string} name - The name of the feature
 * @param {string} description - The description of the feature
 * @returns {Promise<Feature>} - Promise that resolves to the created Feature object
 */
const createFeature = async (name, description) => {
  try {
    const feature = await Feature.create({ name, description });
    return feature;
  } catch (err) {
    throw new Error(`Error creating feature: ${err.message}`);
  }
};

/**
 * Updates an existing feature in the database
 * @param {number} id - The id of the feature to update
 * @param {object} updates - An object containing the fields to update and their new values
 * @returns {Promise<Feature>} - Promise that resolves to the updated Feature object
 */
const updateFeature = async (id, updates) => {
  try {
    const [rowsUpdated, [updatedFeature]] = await Feature.update(updates, {
      returning: true,
      where: { id },
    });
    if (rowsUpdated !== 1) {
      throw new Error(`Error updating feature with id ${id}`);
    }
    return updatedFeature;
  } catch (err) {
    throw new Error(`Error updating feature: ${err.message}`);
  }
};

module.exports = {
  getFeatures,
  createFeature,
  updateFeature,
};
