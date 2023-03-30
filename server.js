const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
    const extname = path.extname(pathname);

    if (extname === '.html' || extname === '') {
        fs.readFile(`.${pathname}`, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error interno del servidor');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        fs.readFile(`.${pathname}`, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Archivo no encontrado');
            } else {
                const contentType = getContentType(extname);
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

function getContentType(extname) {
    switch (extname) {
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpg';
        case '.gif':
            return 'image/gif';
        default:
            return 'text/plain';
    }
}
