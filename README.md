# algoliaSearch

for graphql : 

run node app.js

run this curl : 

curl --location --request POST 'localhost:8000/graphql4' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query getContacts($name: String!) {\n    contacts(firstname: $name) {\n        firstname\n        lastname\n        address\n        email\n    }\n}","variables":{"name":"Marta"}}'

