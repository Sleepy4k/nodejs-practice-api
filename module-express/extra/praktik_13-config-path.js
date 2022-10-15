require('dotenv/config')

module.exports = {
    /*
    |--------------------------------------------------------------------------
    | Application Directory Path
    |--------------------------------------------------------------------------
    */

    system: {
        trait: process.env.PATH_TRAIT || 'traits',
        router: process.env.PATH_ROUTER || 'routes',
        database: process.env.PATH_DATABASE || 'database',
        controller: process.env.PATH_CONTROLLER || 'controller',
        repository: process.env.PATH_REPOSITORY || 'repository'
    }
};