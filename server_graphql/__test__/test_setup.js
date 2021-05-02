const db = require('../models');
const {ApolloServer} = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const server = require('../server')
const apolloInstance = require('../apollo-instance')
const {query, mutate} = createTestClient(apolloInstance.testServer);
const {request, GraphQLClient, gql} = require('graphql-request');

const serverDisconnect = async () => {
    server.disconnect();
    await apolloInstance.apollo.stop();
    db.sequelize.close();
}

module.exports = {
    query, mutate, ApolloServer, db, request, GraphQLClient, gql, serverDisconnect, server
}