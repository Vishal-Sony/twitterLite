const mongoose = require("mongoose");
const tweet = require("./tweets.js");

mongoose.connect("mongodb://localhost:27017/tweets", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

tweet.insertMany([
  {
    name: "Todd",
    tweet: "lol that is so funny!",
    date: Date(),
  },
  {
    name: "Skyler",
    tweet: "I like to go birdwatching with my dog",
    date: Date(),
  },
  {
    name: "Sk8erBoi",
    tweet: "Plz delete your account, Todd",
    date: Date(),
  },
  {
    name: "onlysayswoof",
    tweet: "woof woof woof",
    date: Date(),
  },
]);
