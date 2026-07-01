const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },

  // Favourite products ki list
  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
}, { timestamps: true });

// Password save hone se pehle hash
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (this.password && this.password.startsWith("$2b$")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);