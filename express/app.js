/**** External libraries ****/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkJwt = require('express-jwt');
/**** App modules ****/
const db = require('./db');

/**** Configuration ****/
const appName = "frameworksexam";
const port = (process.env.PORT || 8080);
const app = express();

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../dist/mandatory_exercise'));

// Additional headers for the response to avoid trigger CORS security
// errors in the browser
// Read more here: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  // intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    // respond with 200
    console.log("Allowing OPTIONS");
    res.send(200);
  }
  else {
    // move on
    next();
  }
});

app.use(
    checkJwt({secret: 'myTopSecret123'}).unless(
    {
      path: 
      [
        '/api/ReviewData',
        '/api/reviewData',
        '/api/Authentication',
        '/api/authentication',
        '/api/Users',
        '/api/users'
      ],
    }
));

app.use((err, req, res, next) => 
{
  if (err.name === 'UnauthorizedError') 
  {
    res.json({ error: err.message });
  }
});

/**** Routes ****/
app.get('/api/ReviewData', (req, res) => db.Getreviews({}).then((data) => res.json(data)));

app.get('/api/Users', (req, res) => db.GetUsers({}).then((data) => res.json(data)));

app.get('/api/PostReview', (req, res) => db.Getreviews({}).then((data) => res.json(data)));

app.post('/api/PostReview', (req, res) => 
{
    db.insertData(req.body).then((newId) => 
    {
      res.json({id : newId});
    });
});

app.post('/api/Users', (req, res) => 
{
    let username = req.body.username;
    let password = req.body.password;
    
    bcrypt.hash(password, 10, function(err, hash) 
    {    
      db.AddUser(username, hash).then((newId) => 
      {
        console.log("Adding user: " + username + password);
        res.json({id : newId});
      });
    });
  });

  app.post('/api/authentication', (req, res) => 
  {
      let username = req.body.username;
      let password = req.body.password;

      db.GetUsers({}).then(
        (data) => 
        {
          const user = data.find((user) => user.username === username);

          if(user)
          {
            bcrypt.compare(password, user.password, (err, result) => 
            {
              if (result) 
              {
                console.log('Succes');
                const payload = {username: username, admin: false};

                const token = jwt.sign(payload, 'myTopSecret123', { expiresIn: '1h' });
        
                res.json({
                  message: 'User authenticated succesfully',
                  token: token
                });
              }
            });
          }
        });
  });

/**** Reroute all unknown requests to angular index.html ****/
app.get('/*', (req, res, next) => 
{
  res.sendFile(path.join(__dirname, '../dist/mandatory_exercise/index.html'));
});

/**** Connect to MongoDB and Start! ****/
db.connect().then(() => {

  db.countData({}).then(
    (count) => 
    {
      console.log("Data count: " + count);
    }
  );

  app.listen(port, () => console.log(`${appName} API running on port ${port}!`));

}).catch((e) => console.error(e));




