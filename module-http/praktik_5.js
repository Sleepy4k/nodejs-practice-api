const http = require('http');
const PORT = 5000;

const server = http.createServer((permintaan, respon) => {
    respon.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
    })

    let body = [];

    permintaan.on('data', chuck => {
        body.push(chuck);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body);
    });

    const response = JSON.stringify({
        status: 200,
        data: null 
    });

    respon.end(response);
});

server.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`));