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
  body("reps").notEmpty().isNumeric(),
  body("weight").notEmpty().isNumeric(),
  body("weight").notEmpty().isString(),
  body("weight").notEmpty().isString(),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const user = await exercises.createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      );
      res.status(201).json(user);
    } else {
      console.log({ errors: result.array() });
      res.status(400).json({ Error: "invalid request" });
    }
  })
);
