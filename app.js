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

// GraphQL schema
var schema = buildSchema(`
    type Query {
        contact(id: Int!): Contact
        contacts(firstname: String): [Contact]
    },
    type Contact {
        id: Int
        lastname: String
        firstname: String
        company: String
        email: String
        city: String
        address: String
    }
`);

var getContacts = async function(name) {

    const contacts = await index.search(name.firstname);
    return contacts.hits ;
}
var root = {
  
    contacts: getContacts
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql4', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


const productIndex = client.initIndex('products');

 const productSchema = buildSchema(`
  type Query {
    product(sku: String): Product
    products(name: String): [Product]
  },
  type Product {
    sku: String
    name: String
  }
`);

// Return a single product (based on sku)
const getProduct = async function(args) {
  
    const products = await productIndex.search(args.sku);
    return products.hits[0] ;
};

// Return a list of products 
const retrieveProducts = async function(args) {
    const products = await productIndex.search(args.name);
    console.log("products", products);
    return products.hits ;
};

// The root provides a resolver function for each API endpoint
// Root resolver
 root = {
    product: getProduct,  // Resolver function to return product with specific sku
    products: retrieveProducts
};


app.use('/products', graphqlHTTP({
    schema: productSchema,
    rootValue: root,
    graphiql: true,
}));

app.listen(8000, function() {

    console.log("connected");
});