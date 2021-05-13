const express = require( 'express' );
const router = express.Router();
const path = require( 'path' );
const fs = require( 'fs' );

routesPath = path.resolve( `${__dirname}/../src/routes` ),
PATHS = fs.readdirSync( routesPath ),
moduleMapper = [];

PATHS.forEach(
    ( module ) => {
        const name = module.split( '.' )[ 0 ];
        router.use( `/${ name }`, require(path.resolve(routesPath, module )));
        moduleMapper.push({
            'Module': name,
            'Route': name
        });
    }
);

// console.table( moduleMapper );

module.exports = router
