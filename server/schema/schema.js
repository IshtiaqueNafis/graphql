const graphql = require('graphql'); // shcema describe data types between object types.
const _ = require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = require('graphql');
const {movies, directors} = require("./data");
const Movie = require('../models/MoviesModel');
const Director = require('../models/DirectorModel');

//region ***Movie Type Schema first object Type***
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID}, // means this is the id
        name: {type: GraphQLString}, // name is used for GraphQl type.
        genre: {type: GraphQLString},
        director: {
            type: DirectorType, // this comes from director data
            resolve(parent, args) {
                return _.find(directors, {id: parent.directorId}) // this given all the data from the directors.
            }

        }

    })
})
//endregion

// root queries

//region ***DirectorType Object ***
const DirectorType = new GraphQLObjectType({
    name: 'director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType), // movie type of graphqllist
            resolve(parent, args) {
                return _.filter(movies, {directorId: parent.id});
            }

        }

    })
})
//endregion

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}}, // this is the arugmens which will be passed how will be passed.
            resolve(parent, args) {
                //useloddash
                return _.find(movies, {id: args.id});


            }

        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(directors, {id: args.id});
            }
        },

        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies;
            }

        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return directors;
            }
        }
    })


});


module.exports = new GraphQLSchema({
    query: RootQuery,

})




