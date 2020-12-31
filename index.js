const algoliasearch = require('algoliasearch');

const client = algoliasearch('MZDK07CMHG', '95834b758ad6c0a4d93d0ab9a97ecd8a');
const index = client.initIndex('contacts');

const contactsJSON = require('./contacts.json');

const express = require("express");
var app=express();

var { buildSchema } = require('graphql');
var { graphqlHTTP } = require('express-graphql');
// ------- set settings ----------- 
/*
index.setSettings({
    'customRanking': ['desc(followers)'],  // oder by number of followes desc
    'searchableAttributes': [  // set attributes to search with
        'lastname',
        'firstname',
        'company',
        'email',
        'city',
        'address'
      ]
  }).then(() => {
    // done
    console.log("done")
  })
*/

// -----------put data ---------------


/*index.saveObjects(contactsJSON, {
  autoGenerateObjectIDIfNotExist: true
}).then(({ objectIDs }) => {
  console.log(objectIDs);
});*/

// search 
app.get("/search/:name", async function (req, resp) {

    const name = req.params.name;
    index.search(name).then(({ hits }) => {
        console.log(hits);
        resp.send(hits);
      });

})

 // Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {
  hello: String
}
`);

// The root provides a resolver function for each API endpoint
var root = {
hello: () => {
  return 'Hello world!';
},
};

var app = express();
app.use('/graphql', graphqlHTTP({
schema: schema,
rootValue: root,
graphiql: true,
})); 

var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);
 
// The root provides a resolver function for each API endpoint
var root = {
  rollDice: ({numDice, numSides}) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};
 
var app = express();
app.use('/graphql2', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
 
  type Query {
    getDie(numSides: Int): RandomDie
  }
`);
 
// This class implements the RandomDie GraphQL type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }
 
  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }
 
  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}
 
// The root provides the top-level API endpoints
var root = {
  getDie: ({numSides}) => {
    return new RandomDie(numSides || 6);
  }
}
 
var app = express();
app.use('/graphql3', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// GraphQL schema
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);
var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]
var getCourse = function(args) { 
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}
var getCourses = function(args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}
var root = {
    course: getCourse,
    courses: getCourses
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql4', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(8090, function() {

    console.log("connected");
});