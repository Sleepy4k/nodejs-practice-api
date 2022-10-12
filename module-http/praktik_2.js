const http = require('http');
const PORT = 5000;
const AUTHOR = 'Apri Pandu Wicaksono';

const server = http.createServer((permintaan, respon) => {
    const {header, url, method} = permintaan;
    console.log('Header', header);
    console.log('Url', url);
    console.log('Method', method);

    respon.end(`Hello, i am ${AUTHOR}`);
});

server.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`));