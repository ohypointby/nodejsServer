const http = require('http');

http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-type': 'text/plain'
    });
    response.end('ohy');
}).listen(3000, () => console.log('Server is on'));