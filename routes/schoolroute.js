const express = require('express');
const db = require('../db.js');
const { addSchool, listSchools } = require('../Controller/controller.js');
const router = express.Router();

// Add School API
router.post('/addSchool',addSchool);

// List Schools API
router.get('/listSchools', listSchools);

module.exports = router;
