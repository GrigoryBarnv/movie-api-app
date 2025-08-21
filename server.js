let a = 1;
let b = 2;
let c = 3;

console.log("a =", a);   // print a
console.log("b =", b);   // print b
console.log("c =", c);   // print c




const http = require('http');
  fs = require('fs'),
  url = require('url');

http.createServer((request, response) => {
  let addr = request.url;
  let q = new URL(addr, 'http://' + request.headers.host)
  let filePath = '';

 fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Added to log.');
      }
    });


  if (q.pathname.includes('documentation')) {
    filePath = __dirname + '/documentation.html';
  } else {
    filePath = __dirname + '/index.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
      return;
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    }
  });

}).listen(8080, '0.0.0.0', () => {
  console.log('Server is running at http://0.0.0.0:8080');
});
