// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
// returns current timestamp, if the date_string is empty
app.get('/api', (req, res) => {
  res.json(
    {
      "unix": new Date().getTime(),
      "utc": new Date().toUTCString()
    }
  );
});

// JSON for other requests
app.get('/api/:date_string', (req, res) => {
  const {date_string} = req.params;
  let date = new Date(date_string);

  if (date.toString() === 'Invalid Date') {
    date = new Date(parseInt(date_string));
  }
  if (date.toString() === 'Invalid Date') {
    return res.json(
      {
        "error": "Invalid Date"
      }
    );
  }
  else {
    return res.json(
      {
        "unix": date.getTime(),
        "utc": date.toUTCString()
      }
    );
  }
});


// app.listen(8000, () => {
//   console.log("Your app is listening on port 8000...");
// });



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
