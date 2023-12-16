const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model{}

User.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        credits: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'User',
    }
)
module.exports = User;