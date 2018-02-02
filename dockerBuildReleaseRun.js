
const path = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');
const baseImageUrl = process.env.BASE_IMAGE_URL; // http://via.placeholder.com
const proxyBaseImageUrl = baseImageUrl
  ? proxy(baseImageUrl, {
      proxyReqPathResolver(req) {
        const newPath = baseImageUrl + req.path;
        console.log(newPath);
        return newPath;
      }
    })
  : express.static(path.join(__dirname, 'public/images'));

const app = express();

app.use(morgan('combined'));
app.use('/images', proxyBaseImageUrl);

app.get('/', function(req, res) {
    res.send('<h1>Image placholder proxy</h1><img src="images/320x120" />')
})

app.listen(8080, () => console.log('Server running on port 8080'));