const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const Workout = require("../models/workout.js");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Fitnessdb", 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
 );

const data = {};

Workout.create(data)
.then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });

const databaseUrl = "Fitness";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/stats.html"));
});


//add function to update exercises to a previous workout plan
app.post("/api/workouts", (req, res) => {
  db.fitness.update(
      {
          _id: mongojs.ObjectId(req.params.id)
      },
      {
          $set: {

          }
      },
      (error, data) => {
          if (error) {
              res.send(error);
          } else {
              res.send(data);
          }
      }
  );
});

//add function to create new exercises to a new workout plan
app.post("/api/workouts", (req, res) => {
  console.log(req.body);

  db.notes.insert(req.body, (error, data) => {
      if (error) {
          res.send(error);
      } else {
          res.send(data);
      }
  });
});

//add function to view the weight of all of the exercises on the stats page
app.get("/api/workouts", (req, res) => {
  db.fitness.findAll({}, (error, data) => {
      if (error) {
          res.send(error);
      } else {
          res.json(data);
      }
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
})

