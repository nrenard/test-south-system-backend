const mongoose = require('mongoose');

module.exports = async () => {
  const { collections } = mongoose.connections[0];
  console.log('truncate');
  await Promise.all(Object.keys(collections).map(name => mongoose.connection.collections[name].deleteMany({})));
  await mongoose.connection.dropDatabase();
};
