const express = require('express');
const router = express.Router();

// Import Database
const connection = require('../config/database');

// Index Post
router.get(
  '/',
  (fn = (req, res) => {
    // Query
    connection.query(
      'SELECT * FROM posts ORDER BY id desc',
      (fn = (err, rows) => {
        if (err) {
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
      })
    );
  })
);

module.exports = router;
