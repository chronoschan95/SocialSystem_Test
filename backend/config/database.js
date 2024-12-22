const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('campus_platform', 'chronos', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

// 测试数据库连接
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功！');
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
};

testConnection();

module.exports = sequelize; 