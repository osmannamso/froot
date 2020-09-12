const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('./dist/frootkz'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/frootkz'}
);
});

app.listen(port, () => {
  console.log(`Salamaleikum vsem ya na porte: ${port}`);
});
