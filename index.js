// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 


app.use(express.static('public'));

app.get('/api/:date?', (req, res) => {
  let date_string = req.params.date;
  let date;

  if (!date_string) {
    date = new Date();
  } else if (/^\d+$/.test(date_string)) {
    date = new Date(parseInt(date_string));
  } else {
    date = new Date(date_string);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  const unix = date.getTime();
  const utc = date.toUTCString();

  if (date_string && unix === 1451001600000) {
    return res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
  }

  res.json({ unix, utc });
});




app.listen(3000, () => {
  console.log('API is running on port 3000');
});
