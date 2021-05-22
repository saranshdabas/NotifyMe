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
        districts: [
          {
            id: {
              type: Number,
            },
            payload: {
              type: String,
            },
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

  getInstanceWithoutInit() {
    return mongoose.model('users');
  }
}

export default User;
