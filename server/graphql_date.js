const {
    GraphQLScalarType,
    Kind
} = require('graphql');

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A non-null date scalar for representing dates in ISO format (YYYY-MM-DD)',

    serialize(value) {
        return value.toISOString();
    },

    parseValue(value) {
        const parsedDate = new Date(value);
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
    },

    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            const parsedDate = new Date(ast.value);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
        }
        return null;
    },
});

module.exports = GraphQLDate;