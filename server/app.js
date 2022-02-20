//region ***Setup***
const express = require('express'); // this is the express server
const {graphqlHTTP} = require('express-graphql'); // needed for connecting with http server
const schema = require('./schema/schema'); // schema is where everything is written
const mongoose = require('mongoose');
//endregion

const app = express(); // intrialize the app
const CONNECTIOB_URL = 'mongodb+srv://nafis:nafis123@cluster0.jklsh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(CONNECTIOB_URL);
mongoose.connection.once('open',()=>console.log('Connected to database'))

//region ***setting up routes for graphql***
app.use('/graphql', graphqlHTTP({
// this must take a schema
    schema,
    graphiql: true,// wantt to use graphiql
}));
//endregion


app.listen(5000, () => `sever running on port 5000`);