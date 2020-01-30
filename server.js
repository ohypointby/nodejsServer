const http = require('http');
const fs = require('fs')

http.createServer((request, response) => {
    if (request.url != '/favicon.ico') {
        fs.readFile('pages/' + request.url + '.html', (err, data) => {
            response.setHeader('Content-Type', 'text/html');

            if (!err) {
                response.statusCode = 200;
                response.write(data);
                response.end();
            } else {
                fs.readFile('pages/404.html', (err, data) => {
                    if (err) throw err;

                    response.statusCode = 404;
                    response.write(data);
                    response.end();
                })
            }
        })
    }   
}).listen(8000, () => console.log('Server is on')); 