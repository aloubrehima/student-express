let { Sequelize, DataTypes } = require('sequelize')

// Environment variables are variables a computer stores
let env = process.env.NODE_ENV || 'development'  // set a default if no enviromment variables

console.log('using environment' + env)

let configFile = require(__dirname + '/../config.json') // load database configuration from json file
let config = configFile[env]  //select configuration based on the env

let password = process.env.DB_PASSWORD  // get the db password from an env variable
config.password = password

let db =  {}   // will hold the db models

let sequelize = new Sequelize(config) // create a new Sequelize instance with the loaded config

// // Import the student model and create it using the Seq instance and DataType
let studentModelCreate = require('./student')
let studentModel = studentModelCreate(sequelize, DataTypes)

// add the student model to the db object 
db[studentModel.name] = studentModel


db.sequelize = sequelize // sequelle configuration
db.Sequelize = Sequelize // Sequelle library

module.exports = db
