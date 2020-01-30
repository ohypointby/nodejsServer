const http = require('http');
const fs = require('fs')

http.createServer((request, response) => {
    if (request.url != '/favicon.ico') {
        getPage(request.url, response);
    }   
}).listen(8000, () => console.log('Server is on')); 

function getPage(name, response, statusCode = 200) {
    if (name == '/') name ='index';

    fs.readFile('pages/' + name + '.html', 'utf8', (err, data) => {
        if (!err) {
            fs.readFile('elems/menu.html', 'utf8', (err, elem) => {
                if (err) throw err;

                data = data.replace(/\{\{menu\}\}/g, elem);

                fs.readFile('elems/footer.html', 'utf8', (err, footer) => {
                    if (err) throw err;

                    data = data.replace(/\{\{footer\}\}/g, footer);

                    response.setHeader('Content-Type', 'text/html');
                    response.statusCode = statusCode;
                    response.write(data);
                    response.end();
                })
            })
        } else {
            if (name != '404') getPage('404', response, 404);
            else throw err;
        }
    })
}