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
    //validation
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

    //define formData
    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    // insert query
    connection.query('INSERT INTO posts SET ?', formData, function (err, rows) {
      //if(err) throw err
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
        });
      } else {
        return res.status(201).json({
          status: true,
          message: 'Insert Data Successfully',
          data: rows[0],
        });
      }
    });
  }
);
// ---------------
// Show Post
// ---------------
router.get('/(:id)', function (req, res) {
  let id = req.params.id;

  connection.query(
    `SELECT * FROM posts WHERE id = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
        });
      }

      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: 'Data Post Not Found!',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'Detail Data Post',
          data: rows[0],
        });
      }
    }
  );
});

module.exports = router;
