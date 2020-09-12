const express = require('express');
const app = express();

app.use(express.static('./dist/frootkz'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/frootkz'}
);
});

app.listen(8080);
