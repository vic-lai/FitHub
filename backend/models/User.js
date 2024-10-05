const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class User extends Model {
  static async login(email, password) {
    try {
        const user = await this.findOne({ where: { email } });

        if (!user) {
            throw new Error('Invalid email');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Incorrect password');
        }

        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, {
            expiresIn: '3d',
        });

        return { user, token }; 
    } catch (err) {
        throw err;
    }
}
}

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
