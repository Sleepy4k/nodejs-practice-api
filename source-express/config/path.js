require('dotenv/config')

module.exports = {
    /*
    |--------------------------------------------------------------------------
    | Application Directory Path
    |--------------------------------------------------------------------------
    */

    system: {
        tests: process.env.PATH_TESTS || 'tests',
        trait: process.env.PATH_TRAIT || 'traits',
        router: process.env.PATH_ROUTER || 'routes',
        models: process.env.PATH_MODELS || 'models',
        modules: process.env.PATH_MODULES || 'modules',
        translate: process.env.PATH_TRANSLATE || 'lang',
        service: process.env.PATH_SERVICE || 'services',
        database: process.env.PATH_DATABASE || 'database',
        controller: process.env.PATH_CONTROLLER || 'controllers',
        repository: process.env.PATH_REPOSITORY || 'repositories'
    }
};