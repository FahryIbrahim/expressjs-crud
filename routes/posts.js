const express = require('express');
const router = express.Router();

// Import Express Validator
const { body, validationResult } = require('express-validator');

// Import Database
const connection = require('../config/database');

// ---------------
// Index Post
// ---------------
router.get('/', (req, res) => {
  // Query
  connection.query('SELECT * FROM posts ORDER BY id desc', (err, rows) => {
    if (err) {
      console.error('Database Query Error:', err); // Log the error
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'List Data Posts',
        data: rows, // Data Posts
      });
    }
  });
});

// ---------------
// Store Post
// ---------------
router.post(
  '/store',
  [
    // Validation
    body('title').notEmpty(),
    body('content').notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // Define formData
    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    // Insert Query
    connection.query('INSERT INTO posts SET ?', formData, (err, result) => {
      if (err) {
        console.error('Database Insert Error:', err); // Log the error
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'Insert Data Successfully',
          data: result.insertId,
        });
      }
    });
  }
);

module.exports = router;
