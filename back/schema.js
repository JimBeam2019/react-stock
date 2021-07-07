const path = require('path');
const { mergeTypeDefs } = require ('@graphql-tools/merge');
const { loadFilesSync } = require ('@graphql-tools/load-files');

const typesArray = loadFilesSync(
    path.join(__dirname, './schema/**'), 
    { extensions: ['graphql'] }
);

module.exports = mergeTypeDefs(typesArray);