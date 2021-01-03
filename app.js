const algoliasearch = require('algoliasearch');

const client = algoliasearch('MZDK07CMHG', '95834b758ad6c0a4d93d0ab9a97ecd8a');
const index = client.initIndex('contacts');

const express = require("express");
const app = express();

const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
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