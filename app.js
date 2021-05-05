const express = require('express');
const app = express();

const messages = [
  {
    text:
      'This is a test message to ensure that the messages in this array are being properly interpolated into the template',
    user: 'TestUser',
    added: new Date(),
  },
  { text: 'Another test message', user: 'ABojo', added: new Date() },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { messages: messages });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', (req, res) => {
  const { user, text } = req.body;
  messages.push({ user, text, added: new Date() });

  res.redirect('/');
});

app.all('*', (req, res) => {
  res.send('Sorry, that page does not exist on this server!');
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is listenting for incoming requests!');
});
