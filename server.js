const http = require('http');
const fs = require('fs')

http.createServer((request, response) => {
    if (request.url != '/favicon.ico') {
        fs.readFile('pages/' + request.url + '.html', (err, data) => {
            response.setHeader('Content-Type', 'text/html');

            if (!err) {
                response.statusCode = 200;
                response.write(data);
            } else {
                response.statusCode = 404;
                response.write('<b>Page Not Found</b>');
            }

            response.end();
        })
    }   
}).listen(8000, () => console.log('Server is on')); 