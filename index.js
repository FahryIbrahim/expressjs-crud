const express = require('express')
const app = express()
const port = 3000

// Import Route Posts
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter); //Use Route Posts in Express

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})
