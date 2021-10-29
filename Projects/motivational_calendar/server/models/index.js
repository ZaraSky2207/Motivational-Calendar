const { db, DataTypes, Model } = require('../db')

const { Motivation } = require('./Motivation')
const { User }  = require('./User')


Motivation.belongsTo(User)
User.hasMany(Motivation)

module.exports = { Motivation, User}