const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const bcrypt = require('bcrypt')

class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notNull: {
        msg: 'Email is required'
      },
      isLowercase: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password is required'
      },
      len: [6], 
    }
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
});

User.addHook('beforeCreate', async (user) => {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt)
})

module.exports = User;
