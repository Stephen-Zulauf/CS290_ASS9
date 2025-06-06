/**
 * Add your first name and last name.
 */
import "dotenv/config";
import express from "express";
import asyncHandler from "express-async-handler";
import * as exercises from "./exercises_model.mjs";
import {
  query,
  matchedData,
  validationResult,
  checkSchema,
  body,
} from "express-validator";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
  await exercises.connect();
  console.log(`Server listening on port ${PORT}...`);
});

/**
 * Create a new excercise with the query parameters provided in the body
 */
app.post(
  "/exercises",
  body("name").notEmpty().isString(),
  body("reps").notEmpty().isInt({ min: 1 }),
  body("weight").notEmpty().isInt({ min: 1 }),
  body("unit").notEmpty().isString(),
  body("date")
    .notEmpty()
    .isDate({ format: "MM-DD-YY", delimiters: ["-"], strictMode: true }),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const excercise = await exercises.createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      );
      res.status(201).json(excercise);
    } else {
      console.log({ errors: result.array() });
      res.status(400).json({ Error: "invalid request" });
    }
  })
);

/**
 * Read using GET /exercises
 * (Returns all excercises if filter is empty)
 */
app.get(
  "/exercises",
  asyncHandler(async (req, res) => {
    //build filter from req query
    let filter = {};
    if (req.query.name) {
      filter.name = req.query.name;
    }
    if (req.query.reps) {
      filter.reps = req.query.reps;
    }
    if (req.query.weight) {
      filter.weight = req.query.weight;
    }
    if (req.query.unit) {
      filter.unit = req.query.unit;
    }
    if (req.query.date) {
      filter.date = req.query.date;
    }

    //async call model to search db
    let result = await exercises.getExercises(filter);

    res.status(200).json(result);
  })
);

/**
 * Read one using GET /exercises/:_id
 */
app.get(
  "/exercises/:_id",
  asyncHandler(async (req, res) => {
    const id = req.params._id;
    if (id) {
      //call model to find it
      let result = await exercises.getExercisebyID(id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ Error: "Not Found" });
      }
    } else {
      res.status(400).json({ Error: "Invalid Request" });
    }
  })
);

/**
 * Update using PUT /exercises/:_id
 */
app.put(
  "/exercises/:_id",
  body("name").notEmpty().isString(),
  body("reps").notEmpty().isInt({ min: 1 }),
  body("weight").notEmpty().isInt({ min: 1 }),
  body("unit").notEmpty().isString(),
  body("date")
    .notEmpty()
    .isDate({ format: "MM-DD-YY", delimiters: ["-"], strictMode: true }),
  asyncHandler(async (req, res) => {
    const valResult = validationResult(req);
    const id = req.params._id;

    if (valResult.isEmpty()) {
      //build filter from req query
      let filter = {};
      if (req.body.name) {
        filter.name = req.body.name;
      }
      if (req.body.reps) {
        filter.reps = req.body.reps;
      }
      if (req.body.weight) {
        filter.weight = req.body.weight;
      }
      if (req.body.unit) {
        filter.unit = req.body.unit;
      }
      if (req.body.date) {
        filter.date = req.body.date;
      }

      //async call model to search db
      if (id) {
        console.log(id);
        let result = await exercises.updateExercise(id, filter);

        if (result.matchedCount > 0) {
          //call model to find it
          let result = await exercises.getExercisebyID(id);
          if (result) {
            res.status(200).json(result);
          } else {
            console.log("couldnt find id");
            res.status(404).json({ Error: "Not Found" });
          }
        } else {
          console.log("no matches");
          res.status(404).json({ Error: "Not Found" });
        }
      } else {
        console.log("no id");
        res.status(404).json({ Error: "Not Found" });
      }
    } else {
      console.log({ errors: valResult.array() });
      res.status(400).json({ Error: "Invalid request" });
    }
  })
);

/**
 * delete one using DELETE /exercises/:_id
 */
app.delete(
  "/exercises/:_id",
  asyncHandler(async (req, res) => {
    const id = req.params._id;
    if (id) {
      //call model to find it
      let result = await exercises.deleteExercise(id);
      if (result.deletedCount > 0) {
        res.status(204).json({});
      } else {
        res.status(404).json({ Error: "Not Found" });
      }
    } else {
      res.status(404).json({ Error: "Not Found" });
    }
  })
);
