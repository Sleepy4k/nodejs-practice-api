// Data Dummy
let userData = [
    {urutan: 1, nama: "Benjamin4k", email: "sarahpalastrin@gmail.com"},
    {urutan: 2, nama: "Apri Pandu", email: "3103120028@student.smktelkom-pwt.sch.id"},
];

// Response Json Trait
function responseData(permintaan, params) {
    var body = {
        status: params.status ? params.status : true,
        message: params.message,
        data: params.data,
        method: permintaan.method,
        url: permintaan.url
    }

    return body;
}

// Main Module CRUD
module.exports = {
    index: (permintaan, respon) => {
        if (userData.length > 0) {
            respon.json(responseData(permintaan, {
                data: userData
            }))
        } else {
            respon.json(responseData(permintaan, {
                status: false,
                message: "Data masih kosong"
            }))
        }
    },
    store: (permintaan, respon) => {
        userData.push(permintaan.body)
    
        respon.json(responseData(permintaan, {
            message: "Data berhasil ditambahkan",
            data: userData
        }))
    },
    show: (permintaan, respon) => {
        const urutan = permintaan.params.id;
        const data = userData.find(user => user.urutan == urutan);

        respon.json(responseData(permintaan, {
            message: "Data berhasil ditambahkan",
            data: data
        }))
    },
    update: (permintaan, respon) => {
        const urutan = permintaan.params.id;
        const data = permintaan.body;

        userData.filter(user => {
            if (user.urutan == urutan) {
                user.nama = data.nama
                user.email = data.email

                return user
            }
        })

        respon.json(responseData(permintaan, {
            message: "Data berhasil diubah",
            data: userData
        }))
    },
    delete: (permintaan, respon) => {
        const urutan = permintaan.params.id

        users = userData.filter(user => user.urutan != urutan)

        respon.json(responseData(permintaan, {
            message: "Data berhasil dihapus",
            data: users
        }))
    },
}