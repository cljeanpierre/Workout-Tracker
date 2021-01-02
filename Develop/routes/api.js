const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

//add function to update exercises to a previous workout plan
router.post("/api/workout", (req, res) => {
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
router.post("/api/workout", (req, res) => {
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
router.get("/api/workout", (req, res) => {
    db.fitness.findAll({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;