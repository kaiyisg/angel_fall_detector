const app = require('express')();
const http = require('http').Server(app);

app.set('port', (process.env.API_PORT || 3001));

http.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
