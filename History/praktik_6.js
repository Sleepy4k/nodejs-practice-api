const http = require('http');

const dataTugas = [
    {urutan: 1, tugas: 'Todo Satu'},
    {urutan: 2, tugas: 'Todo Dua'},
    {urutan: 3, tugas: 'Todo Tiga'},
];

const server = http.createServer((req, res) => {
    // Listen client data
    const {method, url} = req;
    
    let body = [];

    req.on('data', chuck => {
        body.push(chuck);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        let status = 200;
        const response = {
            status: status,
            results: [],
            error: ''
        };

        if (url === '/tugas') {
            if (method === 'GET') {
                response.results = dataTugas;
            } else if (method === 'POST') {
                const {urutan, tugas} = JSON.parse(body);
                if (!urutan || !tugas) {
                    response.status = 400;
                    response.error = 'Silahkan masukan data urutan dan tugas yang benar';
                } else {
                    dataTugas.push({urutan, tugas});
                    response.status = 201;
                    response.results = dataTugas;
                }
            }
        }

        res.writeHead(status, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.js'
        })

        res.end(JSON.stringify(response));

    });
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`));