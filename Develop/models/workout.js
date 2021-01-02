const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
    day: {
        type: Date,
        default: () => new Date()
      },
    
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter a type" 
        },

        name: {
          type: String,
          trim: true,
          required: "Enter a name"
        },

        duration: {
          type: Number,
          required: "Enter time spent"
        },

        weights: {
          type: Number,
          required: "Enter weight"
        },

        reps: {
          type: Number,
          required: "Enter the number of repetitions"
        },

        sets: {
          type: Number,
          required: "Enter the number of sets"
        },
        
        distance: {
          type: Number,
          required: "Enter distance"
        }
      }
    ]
});