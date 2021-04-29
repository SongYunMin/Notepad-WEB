const db = require('../models');
const {ApolloServer} = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const server = require('../server')
const {query, mutate} = createTestClient(server.testServer);
const {request, GraphQLClient, gql} = require('graphql-request');

const serverDisconnect = async () => {
    server.disconnect();
    await server.apollo.stop();
    db.sequelize.close();
}

module.exports = {
    query, mutate, ApolloServer, db, request, GraphQLClient, gql, serverDisconnect, server
}