// Get Config File
var { system } = require('../../config/path')

// Traits
var print = require(`../${system.trait}/consoleLogger`)
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

        if (tasks.length <= 0) {
            print.info(respon.__('data.empty'))
            print.debug('request from client to get task data success but empty')

            return responseData.success(permintaan, respon, {
                message: respon.__('data.empty')
            })
        } else {
            print.info(JSON.stringify(tasks))
            print.debug('request from client to get task data success')

            return responseData.success(permintaan, respon, {
                data: tasks
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

            if (!form.urutan) {
                error.push(respon.__('validation.required', 'urutan'))
            }
            
            if (!form.tugas) {
                error.push(respon.__('validation.required', 'tugas'))
            }
            
            print.error(respon.__('data.failed'))
            print.debug('request from client to store task data failed due missing form data')

            return responseData.error(permintaan, respon, {
                message: respon.__('data.failed'),
                error: error
            }, 400)
        }

        var duplicate = tasks.find((task) => task.urutan == form.urutan)
    
        if (duplicate) {
            print.error(respon.__('data.failed'))
            print.debug('request from client to store task data failed due duplicated')

            return responseData.error(permintaan, respon, {
                message: respon.__('data.failed'),
                error: respon.__('data.duplicate')
            }, 409)
        } else {
            tasks.push(form)
        
            taskRepository.saveTaskData(tasks)
        
            print.info(respon.__('data.success', respon.__('operator.add')))
            print.debug('request from client to store task data success')

            return responseData.success(permintaan, respon, {
                message: respon.__('data.success', respon.__('operator.add')),
                data: taskRepository.getTaskData()
            }, 201)
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

        if (!isExist) {
            print.error(respon.__('data.not_found'))
            print.debug('request from client to store task data failed due data not found')

            return responseData.error(permintaan, respon, {
                message: respon.__('data.not_found')
            }, 404)
        } else {
            print.info(JSON.stringify(isExist))
            print.debug('request from client to store task data success')

            return responseData.success(permintaan, respon, {
                data: isExist
            }, 206)
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
            print.error(respon.__('data.not_found'))
            print.debug('request from client to store task data failed due data not found')

            return responseData.error(permintaan, respon, {
                message: respon.__('data.not_found')
            }, 404)
        }

        if (!forms.tugas) {
            print.error(respon.__('data.failed'))
            print.debug('request from client to store task data failed due mising form data')

            return responseData.error(permintaan, respon, {
                message: respon.__('data.failed'),
                error: respon.__('validation.required', 'tugas')
            }, 400)
        } else {
            urutan = urutan - 1

            tasks[urutan].tugas = forms.tugas
    
            taskRepository.saveTaskData(tasks)
    
            print.info(respon.__('data.success', respon.__('operator.change')))
            print.debug('request from client to store task data success')

            return responseData.success(permintaan, respon, {
                message: respon.__('data.success', respon.__('operator.change')),
                data: tasks
            }, 202)
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

        if (tasks.length <= tasksToKepp.length) {
            print.error(respon.__('data.not_found'))
            print.debug('request from client to store task data failed due data not found')

            return responseData.error(permintaan, respon, {
                message: respon.__('data.not_found')
            }, 404)
        } else {
            taskRepository.saveTaskData(tasksToKepp)

            print.info(respon.__('data.success', respon.__('operator.delete')))
            print.debug('request from client to store task data success')

            return responseData.success(permintaan, respon, {
                message: respon.__('data.success', respon.__('operator.delete')),
                data: tasksToKepp
            }, 202)
        }
    },
}