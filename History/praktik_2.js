const http = require('http');
const AUTHOR = 'Apri Pandu Wicaksono';

const server = http.createServer((req, res) => {
    // console.log(req);
    const {header, url, method} = req;
    console.log('Header', header);
    console.log('Url', url);
    console.log('Method', method);

    res.end(`Hello, i am ${AUTHOR}`);
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`));