const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
const app = express();
const mongoose = require("mongoose");
const Tweets = require("./tweets.js");
const Tweet = require("./tweets.js");

mongoose.connect("mongodb://localhost:27017/tweets", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// let tweets = [
//   {
//     id: uuid(),
//     username: "Todd",
//     tweet: "lol that is so funny!",
//     date: Date(),
//   },
//   {
//     id: uuid(),
//     username: "Skyler",
//     tweet: "I like to go birdwatching with my dog",
//     date: Date(),
//   },
//   {
//     id: uuid(),
//     username: "Sk8erBoi",
//     tweet: "Plz delete your account, Todd",
//     date: Date(),
//   },
//   {
//     id: uuid(),
//     username: "onlysayswoof",
//     tweet: "woof woof woof",
//     date: Date(),
//   },
// ];

app.get("/tweets", async (req, res) => {
  const tweets = await Tweets.find({});
  res.render("index", { tweets });
});

app.get("/tweets/new", (req, res) => {
  res.render("new");
});

app.post("/tweets", async (req, res) => {
  const { name, tweet } = req.body;
  const newTweet = new Tweet({ name, tweet, date: Date() });
  await newTweet.save();
  //   const { date } = Date();
  // tweets.push({ name, tweet, date: Date() });
  res.redirect("/tweets");
});

app.get("/tweets/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweets.findById(id);
  res.render("show", { tweet });
});

app.get("/tweets/:id/edit", async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweets.findById(id);

  res.render("edit", { tweet });
});

app.patch("/tweets/:id", async (req, res) => {
  const { id } = req.params;
  const newTweet = req.body.tweet;
  const tweet = await Tweets.findByIdAndUpdate(id, { tweet: newTweet });

  // tweet.tweet = newTweet;
  res.redirect("/tweets");
});

app.delete("/tweets/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweets.findByIdAndDelete(id);
  res.redirect("/tweets");
});

app.listen(3000, () => console.log("on port 3000!!"));
