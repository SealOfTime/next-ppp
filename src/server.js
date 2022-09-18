var https = require('https');
var fs = require('fs');

const next = require('next')
const port = parseInt(process.env.PORT, 10) || config.getPort()
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()


var options = {
  key: fs.readFileSync('./certs/privkey.pem'),
  cert: fs.readFileSync('./certs/fullchain.pen'),
};

app.prepare().then(() => {
  https
    .createServer(options, handle)
    .listen(port, err => {
      if (err) throw err
      console.log(`> Ready on localhost:${port}`)
    })
})
