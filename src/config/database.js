const mongoose = require('mongoose');
class Connection {
  constructor() {
    const url =
      process.env.MONGODB_URI ||
      'mongodb+srv://saransh:<p>@cluster0.chqmt.mongodb.net/test';
    mongoose.Promise = global.Promise;
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose
      .connect(url)
      .then(() => {
        console.log('connected to db');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new Connection();
