import mongoose from "mongoose";

// Create Feedback Schema
const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create Feedback Model
const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;




// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },

//   age: {
//     type: Number,
//     required: true
//   },

//   class: {
//     type: Number,
//     required: true
//   }
// });

// const Student = mongoose.model("Student", studentSchema);

// export default Student;
