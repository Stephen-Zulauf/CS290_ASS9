/**
 * Stephen Zulauf
 */
import mongoose from "mongoose";
import "dotenv/config";

const EXERCISE_DB_NAME = "exercise_db";

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect() {
  try {
    connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
      dbName: EXERCISE_DB_NAME,
    });
    console.log("Successfully connected to MongoDB using Mongoose!");
  } catch (err) {
    console.log(err);
    throw Error(`Could not connect to MongoDB ${err.message}`);
  }
}

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
  name: String,
  reps: Number,
  weight: Number,
  unit: String,
  date: String,
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model(EXERCISE_DB_NAME, exerciseSchema);

/**
 * Create an exercise
 */
const createExercise = async (name, reps, weight, unit, date) => {
  // Call the constructor to create an instance of the model class User
  const exercise = new Exercise({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date,
  });
  // Call save to persist this object as a document in MongoDB
  return exercise.save();
};

/**
 * Get exercise(s)
 * @returns A promise. Resolves to an array of JSON objects that match the filter
 */
const getExercises = async (filter) => {
  const query = Exercise.find(filter);
  return query.exec();
};

/**
 * Get exercise by id
 * @returns A promise.
 */
const getExercisebyID = async (id) => {
  const query = Exercise.findById(id);
  return query.exec();
};

/**
 * Update exercise by id (non - replacment)
 * @returns A promise.
 */
const updateExercise = async (id, body) => {
  const query = await Exercise.findById(id).updateOne(body);
  return query;
};

/**
 * Delete all the exercises matching the specified query parameter
 * @returns A promise.
 */
const deleteExercises = async (filter) => {
  const query = await Exercise.deleteMany(filter);
  return query;
};

/**
 * Delete one exercise by id
 * @returns A promise.
 */
const deleteExercise = async (id) => {
  const query = await Exercise.deleteOne({ _id: id });
  return query;
};

export {
  connect,
  createExercise,
  getExercises,
  getExercisebyID,
  updateExercise,
  deleteExercises,
  deleteExercise,
};
