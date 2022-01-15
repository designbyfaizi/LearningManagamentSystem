const express = require('express');

const router = express.Router();

//Show Dashboard
router.get("/", () => {})

//View Attempted Quiz
router.get("/viewattquiz", () => {})

//Add Quiz
router.post("/addquiz", () => {})

//Download Attempted Quiz
router.get("/quiz/:id", () => {})

//Delete Quiz
router.delete("/quiz/:id", () => {})

//View Attempted Assignment
router.get("/viewattassign", () => {})

//Add Assignment
router.post("/addassign", () => {})

//Download Attempted Assignment
router.get("/assign/:id", () => {})

//Delete Assignment
router.delete("/assign/:id", () => {})

//Add Material
router.post("/addmat", () => {})

//View Material
router.get("/materials", () => {})

//Delete Material
router.delete("/material/:id", () => {})

//Add Marks
router.post("/addmarks", () => {})

//Update Marks
router.put("/marks/:id", () => {})

//Delete Marks
router.delete("/marks/:id", () => {})

module.exports = router;