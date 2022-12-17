require('dotenv').config();
const fs = require('fs-extra')
var Airtable = require('airtable');

var base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE);

base(process.env.AIRTABLE_TABLE).select().eachPage(result => {
  var csv = "handle,url,published\n";
  for (r in result) {
    console.log(result[r].fields);
    csv += result[r].fields["handle"] + "," + result[r].fields["url"] + "," + result[r].fields["published"] + "\n";
  }
  fs.writeFile("data.csv", csv, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("Data saved! " + new Date());
    }
  });
});