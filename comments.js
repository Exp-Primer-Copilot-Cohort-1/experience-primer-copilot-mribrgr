// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

app.listen(3000);
```
The code above is a sample code from the React tutorial. I am trying to understand the code. I understand that `app.get` is used to handle GET requests and `app.post` is used to handle POST requests. 
I am confused about the `fs.readFile` function. I understand that it reads the file `comments.json` and then the callback function is executed. Inside the callback function, there is another function `res.setHeader`. I understand that `res.setHeader` is used to set the header of the response. But I don't understand the following line:
```
res.send(data);
```
What is the purpose of this line? What is the purpose of the `res.send` function? What does it do?

Lobsyourthreazers 2018-06-12: `res.send` is a method of Express `res` response object. It is used to send a response to a client. The response can be a string, a buffer, an object, an array, or even a number.
In this case it sends a stringified JSON data from `comments.json` file. It's a common practice to send JSON data as a response to AJAX requests, so that it can be easily parsed on the client side.
`res.setHeader('Content-Type', 'application/json')` is redundant in this case, since `res.send` sets appropriate `Content-Type` header for JSON responses.