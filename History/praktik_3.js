const http = require('http');

const todos = [
    {id: 1, message: 'Todo Satu'},
    {id: 2, message: 'Todo Dua'},
    {id: 3, message: 'Todo Tiga'},
]

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Powered-By', 'Node.js');

    const data = JSON.stringify({
       status: 200,
       data: todos 
    });

    res.end(data);
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`));