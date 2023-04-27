let { Sequelize, DataTypes } = require('sequelize')

// Environment variables are variables a computer stores
let env = process.env.NODE_ENV || 'development'  // set a default if no enviromment variables

console.log('using environment' + env)

let configFile = require(__dirname + '/../config.json')
let config = configFile[env]

let password = process.env.DB_PASSWORD
config.password = password

let db =  {}

let sequelize = new Sequelize(config)

let studentModelCreate = require('./student')
let studentModel = studentModelCreate(sequelize, DataTypes)

db[studentModel.name] = studentModel

db.sequelize = sequelize // sequelle configuration
db.Sequelize = Sequelize // Sequelle library

module.exports = db
