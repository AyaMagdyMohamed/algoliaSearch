const algoliasearch = require('algoliasearch');

const client = algoliasearch('MZDK07CMHG', '95834b758ad6c0a4d93d0ab9a97ecd8a');
const index = client.initIndex('contacts');

const contactsJSON = require('./contacts.json');

const express = require("express");
var app=express();

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

  

app.listen(8090, function() {

    console.log("connected");
});