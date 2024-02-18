const fs = require('fs');
const express = require('express');
const {
    ApolloServer,
    UserInputError
} = require('apollo-server-express');
const {
    GraphQLScalarType
} = require('graphql');
const {
    Kind
} = require('graphql/language');
const {
    MongoClient
} = require('mongodb');

const url = "mongodb+srv://bishaldhakal099:bishaldhakal099@cluster0.exlkhef.mongodb.net/ems1?retryWrites=true&w=majority";

let db;

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        if (ast.kind == Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
        }
    },
});

const resolvers = {
    Query: {
        employeeList,
    },
    Mutation: {
        employeeAdd,
    },
    GraphQLDate,
};



async function employeeList() {
    try {
        const employees = await db.collection('employees').find({}).toArray();
        return employees;
    } catch (error) {
        console.error('Error fetching employee list:', error.message);
        return [];
    }
}

function employeeValidate(employee) {
    const errors = [];

    if (!employee.FirstName || !employee.LastName) {
        errors.push('Fields "FirstName" and "LastName" are required.');
    }

    if (employee.Age <= 0) {
        errors.push('Field "Age" must be a positive integer.');
    }

    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', {
            errors
        });
    }
}

async function employeeAdd(_, {
    employee
}) {
    employeeValidate(employee);
    const result = await db.collection('employees').insertOne(employee);
    const savedEmployee = await db.collection('employees')
        .findOne({
            _id: result.insertedId
        });
    return savedEmployee;
}

async function connectToDb() {
    const client = new MongoClient(url, {
        useNewUrlParser: true
    });
    await client.connect();
    console.log('Connected to MongoDB at', url);
    db = client.db();
}

(async function () {
    try {
        const server = new ApolloServer({
            typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
            resolvers,
            formatError: error => {
                console.log(error);
                return error;
            },
        });

        const app = express();

        app.use(express.static('public'));

        await server.start();

        server.applyMiddleware({
            app,
            path: '/graphql'
        });

        await connectToDb();

        app.listen(3000, function () {
            console.log('App started on port 3000');
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
})();