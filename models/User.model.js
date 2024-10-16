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
    profile_picture: {
     type:String
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    wishlist: [{type: Schema.Types.ObjectId, ref: 'Vivienda'}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;


