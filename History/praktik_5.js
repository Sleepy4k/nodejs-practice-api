const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
    })

    let body = [];

    req.on('data', chuck => {
        body.push(chuck);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body);
    });

    const data = JSON.stringify({
        status: 200,
        data: null 
    });

    res.end(data);
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`));