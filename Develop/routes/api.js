const router = require('express').Router();
const Workout = require('../models/workout');

router.post('/api/workouts', (req, res)=>{
    Workout.create({})
    .then((dbworkout) => {
        res.json(dbworkout)
    })
    .catch((err) => {
        res.json(err);
    })
})

//function to update exercises to a previous workout plan
router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      // "runValidators" ensures new exercises meet schema requirements
      { new: true, runValidators: true }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

//router.get()
//function to create new exercises to a new workout plan
router.post("/api/workouts", (req, res) => {
  console.log(req.body);

  db.notes.insert(req.body, (error, data) => {
      if (error) {
          res.send(error);
      } else {
          res.send(data);
      }
  });
});

//router.get()
//function to view the weight of all of the exercises on the stats page
router.get("/api/workouts", (req, res) => {
  db.fitness.findAll({}, (error, data) => {
      if (error) {
          res.send(error);
      } else {
          res.json(data);
      }
  });
});

module.exports = router;