const algoliasearch = require('algoliasearch');

const client = algoliasearch('MZDK07CMHG', '95834b758ad6c0a4d93d0ab9a97ecd8a');
const index = client.initIndex('contacts');

const contactsJSON = require('./contacts.json');

// ------- set settings ----------- 
/*
index.setSettings({
    'customRanking': ['desc(followers)'],
    'searchableAttributes': [
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
index.search('jimmie').then(({ hits }) => {
    console.log(hits);
  });
  
  // Search for a first name with typo
  index.search('jimie').then(({ hits }) => {
    console.log("---------typo---------")
    console.log(hits);
  });

