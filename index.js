const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors')

app.uss(cors())

// Import Body Parser
const bodyParser = require('body-parser');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Import Route Posts
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter); // Use Route Posts in Express

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
