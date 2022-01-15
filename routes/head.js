const express = require('express');

const router = express.Router();

//View Classes
router.get("/class", (req, res, next) => {});

//View Result of Class
router.get("/results/class/:id", (req, res, next) => {});

//View Result of Student
router.get("/results/student/:id", (req, res, next) => {});

//View Materials
router.get("/materials", (req, res, next) => {});

//View Graph
router.get("/graph", (req, res, next) => {});

//Show Dashboard
router.get("/", (req, res, next) => {})

module.exports = router;