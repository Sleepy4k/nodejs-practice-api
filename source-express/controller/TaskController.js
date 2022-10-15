var chalk = require("chalk")

// Get Config File
var { env, name } = require('../config/app')
var { system } = require('../config/path')

// Trait Response
var responseData = require(`../${system.trait}/responseData`)

// Repository Model
var taskRepository = require(`../${system.repository}/TaskRepository`)

// Main Module CRUD
module.exports = {
    /**
     * Display a listing of the resource.
     *
     * @param Request permintaan
     * @param Response respon
     * 
     * @return Array
     */
    index: (permintaan, respon) => {
        var tasks = taskRepository.getTaskData()

        if (tasks.length > 0) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: ${tasks}`));
            }

            return responseData.success(permintaan, respon, {
                data: tasks
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data masih kosong`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data masih kosong"
            })
        }
    },

    /**
     * Store a newly created resource in storage.
     *
     * @param Request permintaan
     * @param Response respon
     * 
     * @return Array
     */
    store: (permintaan, respon) => {
        var form = permintaan.body
        var tasks = taskRepository.getTaskData()

        if (!form.urutan || !form.tugas) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data gagal untuk dibuat`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data gagal untuk dibuat",
                error: "Formulir urutan dan tugas harus di isi"
            })
        }

        var duplicate = tasks.find((task) => task.urutan == form.urutan)
    
        if (duplicate) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data gagal untuk dibuat`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data gagal untuk dibuat",
                error: "Data id terduplikat"
            })
        } else {
            tasks.push(form)
        
            taskRepository.saveTaskData(tasks)
        
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data berhasil ditambahkan`));
            }

            return responseData.success(permintaan, respon, {
                message: "Data berhasil ditambahkan",
                data: taskRepository.getTaskData()
            })
        }
    },
    
    /**
     * Display a specified resource.
     *
     * @param Request permintaan
     * @param Response respon
     * @param Int id
     * 
     * @return Array
     */
    show: (permintaan, respon) => {
        var urutan = permintaan.params.id
        var isExist = taskRepository.findTaskData(urutan)

        if (isExist) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: ${isExist}`));
            }

            return responseData.success(permintaan, respon, {
                data: isExist
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data tidak ditemukan`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data tidak ditemukan"
            })
        }
    },
    
    /**
     * Update the specified resource in storage.
     *
     * @param Request permintaan
     * @param Response respon
     * @param Int id
     * 
     * @return Array
     */
    update: (permintaan, respon) => {
        var forms = permintaan.body
        var urutan = permintaan.params.id
        var tasks = taskRepository.getTaskData()
        var isExist = taskRepository.findTaskData(urutan)

        if (!isExist) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data tidak ditemukan`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data tidak ditemukan"
            })
        }

        if (forms.tugas) {
            urutan = urutan - 1

            tasks[urutan].tugas = forms.tugas
    
            taskRepository.saveTaskData(tasks)
    
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data berhasil diubah`));
            }

            return responseData.success(permintaan, respon, {
                message: "Data berhasil diubah",
                data: tasks
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data gagal untuk dibuat`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data gagal untuk dibuat",
                error: "Formulir tugas harus di isi"
            })
        }
    },
    
    /**
     * Remove the specified resource from storage.
     *
     * @param Request permintaan
     * @param Response respon
     * @param Int id
     * 
     * @return Array
     */
    destroy: (permintaan, respon) => {
        var urutan = permintaan.params.id
        var tasks = taskRepository.getTaskData()
        var tasksToKepp = tasks.filter((task) => task.urutan != urutan)

        if (tasks.length > tasks.length) {
            taskRepository.saveTaskData(tasksToKepp)

            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data berhasil dihapus`));
            }

            return responseData.success(permintaan, respon, {
                message: "Data berhasil dihapus",
                data: tasksToKepp
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(`[${name}] Response: Data tidak ditemukan`));
            }

            return responseData.error(permintaan, respon, {
                message: "Data tidak ditemukan"
            })
        }
    },
}