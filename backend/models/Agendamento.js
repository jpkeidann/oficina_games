const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Agendamento = db.define('agendamento', {
    codAgendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    idConsole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codConsole',
            model: 'consoles'
        }
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codCliente',
            model: 'clientes'
        }
    },
}, {
    timestamps: false,
    tableName: 'agendamentos'
})

module.exports = Agendamento