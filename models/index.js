const dbConfig = require("../config/db.config.js");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB,
    dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        pool: { 
            max: dbConfig.pool.max,
            mim: dbConfig.pool.mim,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    });

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.users = require('./users.model.js')
    (sequelize, Sequelize);

    module.exports = db;