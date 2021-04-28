const db = require('../models');
const {ApolloServer} = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const server = require('../server')
const {query, mutate} = createTestClient(server);
const {request, GraphQLClient, gql} = require('graphql-request');

module.exports = {
    query, mutate, ApolloServer, db, request, GraphQLClient, gql
}