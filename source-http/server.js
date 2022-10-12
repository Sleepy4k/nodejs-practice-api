const http = require('http');
const PORT = 5000;

const dataTugas = [
    {urutan: 1, tugas: 'Tugas Satu'},
    {urutan: 2, tugas: 'Tugas Dua'},
    {urutan: 3, tugas: 'Tugas Tiga'},
];

const server = http.createServer((permintaan, respon) => {
    const {method, url} = permintaan;
    
    let body = [];

    permintaan.on('data', chuck => {
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

        respon.writeHead(status, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.js'
        })

        respon.end(JSON.stringify(response));

    });
});

server.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`));