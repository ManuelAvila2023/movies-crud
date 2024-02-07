const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include: [Genre, Actor, Director]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id,{include: [Genre, Actor, Director]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setGenres = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);  
    if (!result) return res.sendStatus(404);
    await result.setGenres(req.body);
    const genres = await result.getGenres();
    return res.json(genres)
});

const setActors = catchError(async(req, res) => {
    //buscamos el actores
    const { id } = req.params;
    const result = await Movie.findByPk(id);  
    //en caso de no encontrarse
    if (!result) return res.sendStatus(404);
    //seteo los actores
    await result.setActors(req.body);
    //leer los generos que setee, con el objetivo de poder retornarlos
    const actors = await result.getActors();
    return res.json(actors)
});

const setDirectors = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);  
    if (!result) return res.sendStatus(404);
    await result.setDirectors(req.body);
    const directors = await result.getDirectors();
    return res.json(directors)
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenres,
    setActors,
    setDirectors    
}