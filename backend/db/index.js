const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env["MONGO_URI"], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

const shortenedSchema = mongoose.Schema({ longUrl: String });

let Shortened = mongoose.model("Shortened", shortenedSchema);

const createShortened = (longUrl, done) => {
  findByLongUrl(longUrl, (err, data) => {
    if (err) return done(err);
    else {
      if (data) return done(null, data);
      else {
        const shortenedDoc = new Shortened({ longUrl: longUrl });
        shortenedDoc.save((err, data) => {
          if (err) return done(err);
          else return done(null, data);
        });
      }
    }
  });
};

const findByLongUrl = (longUrl, done) => {
  Shortened.findOne({ longUrl: longUrl }, (err, data) => {
    if (err) done(err);
    else done(null, data);
  });
};

const findByShortUrl = (shortUrl, done) => {
  Shortened.findById(shortUrl, (err, data) => {
    if (err) return done(err);
    else done(null, data);
  });
};

module.exports = { createShortened, findByShortUrl };

// findByShortUrl("60b898b6adffb400b87a9a77", (err, data) => {
//   if (err) console.log(err)
//   else console.log(data)
// })

// createShortened("https://fourth.com", (err, data) => {
//   if (err) return console.log(err)
//   else console.log(data)
// });
// createShortened("https://reallyNew.com", (err, data) => {
//   if (err) return console.log(err)
//   else console.log(data)
// });
// createShortened("https://fifth.com");
// createShortened("https://sixth.org");

// findByUrl("https://fourth.com")
// findByUrl("https://unknown.com")
// findByUrl("example.com")
