const { log } = require("console")

module.exports = (Sequelize, DataTypes) => {
    let Student = Sequelize.define('Student', {
        name:{
            type : DataTypes.STRING,
            allowNull: false
        },

        StarID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    Student.sync( {force: true } ).then( () => {
        console.log('Synced student table ')
    })

    return Student
}