const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');

const server = http.createServer(app);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/* ========= API ========= */
const mockDb = require('./mockDb');
app.get('/api/post/:date/:title', (req, res) => {
  const title = req.params.title;
  const dateArray = _.split(req.params.date, '-');
  const date = {
    year: dateArray[0],
    month: dateArray[1],
    day: dateArray[2]
  };
  mockDb.getPostByDateAndTitle(date, title)
    .then(post => res.status(200).send(post))
    .catch(error => res.status(400).send(error));
});

app.get('/api/posts/:category', (req, res) => {
  const category = req.params.category;
  mockDb.getPostsByCategory(category)
    .then(posts => res.status(200).send(posts))
    .catch(error => res.status(400).send(error));
});

app.get('/api/comments/:title', (req, res) => {
  const title = req.params.title;
  mockDb.getCommentsByPost(title)
    .then(comments => res.status(200).send(comments))
    .catch(error => res.status(400).send(error));
});
app.put('/api/comments/:title', (req, res) => {
  const title = req.params.title;
  const comment = req.body.comment;
  mockDb.commentOnPost(title, comment)
    .then(comments => res.status(200).send(comments))
    .catch(error => res.status(400).send(error));
});
/* ======================= */

app.use(express.static(__dirname + '/public'));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/dist/index.html');
});

server.listen(8080);
console.log('server running');
