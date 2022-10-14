const http = require('http');
const fs = require('fs');

// Get Config File
require('dotenv/config');

// Const for listen web
const name = process.env.APP_NAME
const port = process.env.APP_PORT

// Database Location
const tugasData = `./${process.env.DB_PATH}/tugas.json`

// Read Database User File
function getTugasData() {
    const jsonData = fs.readFileSync(tugasData)

    return JSON.parse(jsonData)
}

// Write Database User File
function saveTugasData(body) {
    const stringifyData = JSON.stringify(body)
    fs.writeFileSync(tugasData, stringifyData)
}

// Main Function Create Server
const server = http.createServer((permintaan, respon) => {
    const {method, url} = permintaan;
    
    let body = [];

    permintaan.on('data', chuck => {
        body.push(chuck);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        let code = 200;
        let status = true;
        const response = {
            status: status,
            message: '',
            meta: {
                hostname: permintaan.hostname,
                method: permintaan.method,
                url: permintaan.url
            },
            data: [],
            error: ''
        };

        if (url === '/tugas') {
            if (method === 'GET') {
                response.data = getTugasData();
            } else if (method === 'POST') {
                const {urutan, tugas} = JSON.parse(body);
                if (!urutan || !tugas) {
                    code = 400;
                    status = false;
                    response.error = 'Silahkan masukan data urutan dan tugas yang benar';
                } else {
                    const object = getTugasData()

                    if (object.find(data => data.urutan == urutan)) {
                        status = false;
                        code = 500;
                        response.message = 'proses gagal'
                        response.error = 'Data urutan terduplikat';

                        return respon.end(JSON.stringify(response))
                    }

                    object.push({urutan, tugas});

                    saveTugasData(object);

                    code = 201;
                    response.results = getTugasData();
                }
            }
        }

        respon.writeHead(code, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.js'
        })

        respon.end(JSON.stringify(response));
    });
});

// Listen Web
server.listen(port, () => console.log(`${name} berjalan pada port ${port}`));