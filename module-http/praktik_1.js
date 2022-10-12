const http = require('http');
const PORT = 5000;

const server = http.createServer((permintaan, respon) => {
    console.log(permintaan);
});

server.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`));