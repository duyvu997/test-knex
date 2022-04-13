'use strict';

const { createError, BAD_REQUEST } = require('../../common/error-utils');
const createGuts = require('../model-guts');

const name = 'Village';
const tableName = 'villages';
const selectableProps = [
  'id',
  'name',
  'location',
  'photos',
  'managers',
  'introduction',
  'population',
  'topography',
  'seasons',
  'folklore',
  'building',
  'history',
  'natural',
  'traffic',
  'celebrarity',
  'traditional_craftsmen',
  'foodset',
  'problems',
  'background',
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const beforeSave = async (village) => {
    const {
      population,
      topography,
      seasons,
      folklore,
      building,
      history,
      natural,
      traffic,
      celebrarity,
      traditional_craftsmen,
      foodset,
      problems,
    } = village;
    if (population) {
      village.population = JSON.stringify(population);
    }
    if (topography) {
      village.topography = JSON.stringify(topography);
    }
    if (seasons) {
      village.seasons = JSON.stringify(seasons);
    }
    if (folklore) {
      village.folklore = JSON.stringify(folklore);
    }
    if (building) {
      village.building = JSON.stringify(building);
    }
    if (history) {
      village.history = JSON.stringify(history);
    }
    if (natural) {
      village.natural = JSON.stringify(natural);
    }
    if (traffic) {
      village.traffic = JSON.stringify(traffic);
    }
    if (celebrarity) {
      village.celebrarity = JSON.stringify(celebrarity);
    }
    if (traditional_craftsmen) {
      village.traditional_craftsmen = JSON.stringify(traditional_craftsmen);
    }
    if (foodset) {
      village.foodset = JSON.stringify(foodset);
    }
    if (problems) {
      village.problems = JSON.stringify(problems);
    }

    return village;
  };

  const postFindOne = (village) => {
    if (!village) {
      throw createError(BAD_REQUEST, 'village not found');
    }
    const {
      population,
      topography,
      seasons,
      folklore,
      building,
      history,
      natural,
      traffic,
      celebrarity,
      traditional_craftsmen,
      foodset,
      problems,
    } = village;
    if (population) {
      village.population = JSON.parse(population.slice(1, -1));
    }
    if (topography) {
      village.topography = JSON.parse(topography.slice(1, -1));
    }
    if (seasons) {
      village.seasons = JSON.parse(seasons);
    }
    if (folklore) {
      village.folklore = JSON.parse(folklore.slice(1, -1));
    }
    if (building) {
      village.building = JSON.parse(building.slice(1, -1));
    }
    if (history) {
      village.history = JSON.parse(history.slice(1, -1));
    }
    if (natural) {
      village.natural = JSON.parse(natural.slice(1, -1));
    }
    if (traffic) {
      village.traffic = JSON.parse(traffic.slice(1, -1));
    }
    if (celebrarity) {
      village.celebrarity = JSON.parse(celebrarity.slice(1, -1));
    }
    if (traditional_craftsmen) {
      village.traditional_craftsmen = JSON.parse(
        traditional_craftsmen.slice(1, -1)
      );
    }
    if (foodset) {
      village.foodset = JSON.parse(foodset.slice(1, -1));
    }
    if (problems) {
      village.problems = JSON.parse(problems.slice(1, -1));
    }

    return village;
  };

  const create = (props) =>
    beforeSave(props).then((village) => guts.create(village));

  const update = (id, props) =>
    beforeSave(props).then((village) => guts.update(id, village));

  const findOne = (filters) =>
    guts.findOne(filters).then((village) => postFindOne(village));

  return {
    ...guts,
    create,
    findOne,
    update,
  };
};
