import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class User {
  initSchema() {
    const schema = Schema(
      {
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        state: {
          type: String,
        },
        district: [
          {
            type: String,
          },
        ],
      },
      { timestamps: true }
    );
    schema.plugin(uniqueValidator);
    mongoose.model('users', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('users');
  }
}

export default User;
