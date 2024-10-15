const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password required.']
    },
    username: {
      type: String,
      required: [true, 'Username required.']
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    likes: [{type: Schema.Types.ObjectId, ref: 'Viviendas'}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
