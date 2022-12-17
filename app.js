const {parse} = require('csv-parse');
const fs = require('fs-extra')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


app.get('/journalist/:id', async (req, res) => {
  var html = "Not found.;"
  const parser = fs
    .createReadStream("data.csv")
    .pipe(parse({
      columns: true
    }));
  for await (const record of parser) {
    if (record.handle == req.params.id) {
      html = '<a href="'+record.url+'" rel="me">Link to Mastodon profile</a>';
      break;
    }
  }
  res.send(html);
})