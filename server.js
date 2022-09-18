var https = require('https');
var fs = require('fs');

const next = require('next')
const port = 443;
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'ppp.itmo.online'
const app = next({ dev, hostname: hostname, port: port, dir: __dirname })
const handle = app.getRequestHandler()


var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/ppp.itmo.online/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/ppp.itmo.online/fullchain.pem'),
};

app.prepare().then(() => {
  https
    .createServer(options, handle)
    .listen(port, err => {
      if (err) throw err
      console.log(`> Ready on localhost:${port}`)
    })
})
