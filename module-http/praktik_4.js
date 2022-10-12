const http = require('http');
const PORT = 5000;

const dataTugas = [
    {urutan: 1, tugas: 'Tugas Satu'},
    {urutan: 2, tugas: 'Tugas Dua'},
    {urutan: 3, tugas: 'Tugas Tiga'},
];

const server = http.createServer((permintaan, respon) => {
    respon.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
    })

    const response = JSON.stringify({
       status: 200,
       data: dataTugas 
    });

    respon.end(response);
});

server.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`));