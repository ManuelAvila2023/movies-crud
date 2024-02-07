const Movie = require("./Movie");
const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");

Movie.belongsToMany(Actor,{through: 'movieActor'})
Actor.belongsToMany(Movie,{through: 'movieActor'})

//Actor-> movieId
//Actor.belongsTo(Movie) //movieId
//Movie.hasMany(Actor)

Movie.belongsToMany(Director,{through: 'movieDirector'})
Director.belongsToMany(Movie,{through: 'movieDirector'})
//Director-> movieId
//Director.belongsTo(Movie) // movieId
//Movie.hasMany(Director)

Movie.belongsToMany(Genre,{through: 'movieGenre'})
Genre.belongsToMany(Movie,{through: 'movieGenre'})
// Genre-> movieId
//Genre.belongsTo(Movie) // movieId
//Movie.hasMany(Genre)