# algoliaSearch

for graphql : 

run node app.js

run this curl : 

curl --location --request POST 'localhost:8000/graphql4' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query getContacts($name: String!) {\n    contacts(firstname: $name) {\n        firstname\n        lastname\n        address\n        email\n    }\n}","variables":{"name":"Marta"}}'



run these curls for products  : 


curl --location --request POST 'localhost:8000/products' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query getproduct($sku: String!) {\n    product(sku: $sku) {\n        name\n        sku\n     \n    }\n}","variables":{"sku":"1003269"}}'



curl --location --request POST 'localhost:8000/products' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query getproducts($name: String!) {\n    products(name: $name) {\n        name\n        sku\n     \n    }\n}","variables":{"name":"Black"}}'