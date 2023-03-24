const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        user_name: {
            type: String,
        },
        password:
        {
            type: String,
        },
        name:
        {
            type: String,
        },
        phone_number:
        {
            type: String,
        },
        cars: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Cars',
            },
          ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

module.exports = userSchema;