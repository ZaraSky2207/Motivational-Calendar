const { db, DataTypes, Model } = require('../db')

class User extends Model {

}

User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    favoriteQuotes: DataTypes.STRING
},{
    sequelize: db
})

module.exports = { User }