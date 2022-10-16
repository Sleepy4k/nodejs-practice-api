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
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', JSON.stringify(tasks)))))
            }

            return responseData.success(permintaan, respon, {
                data: tasks
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.empty')))))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.empty')
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
            var error = []

            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.failed')))))
            }

            if (!form.urutan) {
                error.push(respon.__('validation.required', 'urutan'))
            }

            if (!form.tugas) {
                error.push(respon.__('validation.required', 'tugas'))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.failed'),
                error: error
            })
        }

        var duplicate = tasks.find((task) => task.urutan == form.urutan)
    
        if (duplicate) {
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.failed')))))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.failed'),
                error: respon.__('data.duplicate')
            })
        } else {
            tasks.push(form)
        
            taskRepository.saveTaskData(tasks)
        
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.success', respon.__('operator.add'))))))
            }

            return responseData.success(permintaan, respon, {
                message: respon.__('data.success', respon.__('operator.add')),
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
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', JSON.stringify(isExist)))))
            }

            return responseData.success(permintaan, respon, {
                data: isExist
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.not_found')))))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.not_found')
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
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.not_found')))))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.not_found')
            })
        }

        if (forms.tugas) {
            urutan = urutan - 1

            tasks[urutan].tugas = forms.tugas
    
            taskRepository.saveTaskData(tasks)
    
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.success', respon.__('operator.change'))))))
            }

            return responseData.success(permintaan, respon, {
                message: respon.__('data.success', respon.__('operator.change')),
                data: tasks
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.failed')))))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.failed'),
                error: respon.__('validation.required', 'tugas')
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
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.success', respon.__('operator.delete'))))))
            }

            return responseData.success(permintaan, respon, {
                message: respon.__('data.success', respon.__('operator.delete')),
                data: tasksToKepp
            })
        } else {
            if (env == 'local') {
                console.log(chalk.yellow.bold(respon.__('debug.template', name, respon.__('debug.response', respon.__('data.not_found')))))
            }

            return responseData.error(permintaan, respon, {
                message: respon.__('data.not_found')
            })
        }
    },
}