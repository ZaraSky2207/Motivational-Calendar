const { db, DataTypes, Model } = require('../db')

class Motivation extends Model {

}

Motivation.init({
    quote: DataTypes.STRING,
    author: DataTypes.STRING,
   
},{
    sequelize: db
})

module.exports = { Motivation }