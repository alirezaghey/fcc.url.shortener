const express = require("express");
const db = require("../db");
const path = require("path");
require("dotenv").config();

const app = express();
const staticPath = path.join(__dirname, "public/static");
app.use(express.static(staticPath));

// shortened url for redirection
app.get("/api/shorturl/:shorturl", (req, res) => {
  db.findByShortUrl(req.params.shorturl, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.sendFile("err500.html", { root: staticPath });
    } else {
      if (!data) {
        res.status(404);
        res.sendFile("err404.html", { root: staticPath });
      } else {
        const url = data.longUrl;
        res.redirect(url);
      }
    }
  });
});

// new url post
// returns a json containing shor and long url
app.post("/api/shorturl", (req, res) => {});

// frontend of the applicaiton
// containing a form to post new urls for shortening to /api/shorturl
app.get("/", (req, res) => {
  res.send("<h1>Frontend</h1><p>Under Construction</p>");
});

app.listen(process.env.PORT || 3000, (az) => {
  console.log(`Listening on port: ${process.env.PORT || 3000}`);
  console.log(az);
});
